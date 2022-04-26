using Microsoft.Cadl.Remote;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Cadl.Compiler;

public class CadlRestLibrary : RemoteBaseType {
  public CadlRestLibrary(IpcProxyObject proxy) : base(proxy) {
  }

  public async Task<OperationDetails[]> GetAllRoutesAsync(Program program) {
    var result = await Proxy.CallMethodAsync<RemoteArrayMeta>("getAllRoutes", program.Proxy.Data);
    return result.Items.Select(x => new OperationDetails(new IpcProxyObject(this.Proxy.Remote, (RemoteObjectMeta)x))).ToArray();
  }

  public class OperationDetails : RemoteBaseType {
    public OperationDetails(IpcProxyObject proxy) : base(proxy) {
    }

    public string Path => Proxy.GetValue<string>("path");
    public string Verb => Proxy.GetValue<string>("verb");
  }
}
