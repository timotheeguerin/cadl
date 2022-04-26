using Microsoft.Cadl.Compiler;
using Microsoft.Cadl.Remote;
using Nerdbank.Streams;
using StreamJsonRpc;

class Program {
  static async Task<int> Main(string[] args) {
    await RespondToRpcRequestsAsync(FullDuplexStream.Splice(Console.OpenStandardInput(), Console.OpenStandardOutput()), 0);

    return 0;
  }

  private static async Task RespondToRpcRequestsAsync(Stream stream, int clientId) {
    await Console.Error.WriteLineAsync($"Connection request #{clientId} received. Spinning off an async Task to cater to requests.");
    var server = new Server();

    var jsonRpc = JsonRpc.Attach(stream, server);
    server.Connection = jsonRpc;
    await Console.Error.WriteLineAsync($"JSON-RPC listener attached to #{clientId}. Waiting for requests...");
    await jsonRpc.Completion;
    await Console.Error.WriteLineAsync($"Connection #{clientId} terminated.");
  }
}

internal class Server {
  public JsonRpc Connection { get; internal set; }

  public async Task onEmit(RemoteObjectMeta program) {
    var remote = new CadlRemote(this.Connection);

    // Log to STDERR so as to not corrupt the STDOUT pipe that we may be using for JSON-RPC.
    var programProxy = new Microsoft.Cadl.Compiler.Program(new IpcProxyObject(remote, program));
    await new MyCadlExtension(remote).OnEmit(programProxy);

    return;
  }
}

public class MyCadlExtension {
  private readonly CadlRemote remote;

  public MyCadlExtension(CadlRemote remote) {
    this.remote = remote;
  }

  public async Task OnEmit(Microsoft.Cadl.Compiler.Program program) {
    var options = program.CompilerOptions;
    var outputPath = options.OutputPath;
    Console.Error.WriteLine($"OutputPath: {outputPath}");

    var rest = await remote.ImportModuleAsync<CadlRestLibrary>("@cadl-lang/rest");
    var result = await rest.GetAllRoutesAsync(program);
    Console.Error.WriteLine("Rest library:");
    foreach (var member in result) {
      Console.Error.WriteLine($" {member.Verb} {member.Path}");
    }
  }
}

public class IpcProxyObject {
  public CadlRemote Remote { get; }

  public RemoteObjectMeta Data { get; }

  public IpcProxyObject(CadlRemote remote, RemoteObjectMeta data) {
    this.Remote = remote;
    this.Data = data;
  }

  public T GetValue<T>(string propertyName) {
    return this.GetValueAsync<T>(propertyName).GetAwaiter().GetResult();
  }

  public async Task<T> GetValueAsync<T>(string propertyName) {
    var data = await Remote.GetPropertyAsync<RemoteValueMeta<T>>(this.Data, propertyName);
    return data.Value;
  }

  public IpcProxyObject GetObject(string propertyName) {
    return GetObjectAsync(propertyName).GetAwaiter().GetResult();
  }

  public async Task<IpcProxyObject> GetObjectAsync(string propertyName) {
    var data = await Remote.GetPropertyAsync<RemoteObjectMeta>(this.Data, propertyName);
    return new IpcProxyObject(Remote, data);
  }


  public async Task<T> CallMethodAsync<T>(string methodName, params RemoteMeta[] args) {
    return await Remote.CallMethodAsync<T>(Data, methodName, args);
  }
}
