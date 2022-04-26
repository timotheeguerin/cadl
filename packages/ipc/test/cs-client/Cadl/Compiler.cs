using StreamJsonRpc;

namespace Microsoft.Cadl.Compiler;

public class RemoteBaseType {
  public RemoteBaseType(IpcProxyObject proxy) {
    Proxy = proxy;
  }

  public IpcProxyObject Proxy { get; }
}

public class Program : RemoteBaseType {
  public Program(IpcProxyObject proxy) : base(proxy) {
  }

  public CompilerOptions CompilerOptions => new CompilerOptions(Proxy.GetObject("compilerOptions"));
}


public class CompilerOptions : RemoteBaseType {
  public CompilerOptions(IpcProxyObject proxy) : base(proxy) {
  }

  public string OutputPath => Proxy.GetValue<string>("outputPath");

}
