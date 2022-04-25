using System.IO.Pipes;
using Nerdbank.Streams;
using StreamJsonRpc;

class Program {
  static async Task<int> Main(string[] args) {
    await RespondToRpcRequestsAsync(FullDuplexStream.Splice(Console.OpenStandardInput(), Console.OpenStandardOutput()), 0);

    return 0;
  }

  private static async Task NamedPipeServerAsync() {
    int clientId = 0;
    while (true) {
      await Console.Error.WriteLineAsync("Waiting for client to make a connection...");
      var stream = new NamedPipeServerStream("StreamJsonRpcSamplePipe", PipeDirection.InOut, NamedPipeServerStream.MaxAllowedServerInstances, PipeTransmissionMode.Byte, PipeOptions.Asynchronous);
      await stream.WaitForConnectionAsync();
      Task nowait = RespondToRpcRequestsAsync(stream, ++clientId);
    }
  }

  private static async Task RespondToRpcRequestsAsync(Stream stream, int clientId) {
    await Console.Error.WriteLineAsync($"Connection request #{clientId} received. Spinning off an async Task to cater to requests.");
    var jsonRpc = JsonRpc.Attach(stream, new Server());
    await Console.Error.WriteLineAsync($"JSON-RPC listener attached to #{clientId}. Waiting for requests...");
    await jsonRpc.Completion;
    await Console.Error.WriteLineAsync($"Connection #{clientId} terminated.");
  }
}

internal class Server {
  public int test(int a, int b) {
    // Log to STDERR so as to not corrupt the STDOUT pipe that we may be using for JSON-RPC.
    Console.Error.WriteLine($"3Received request: {a} + {b}");

    return a + b;
  }
}
