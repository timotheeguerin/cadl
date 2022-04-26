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

  public Task<RemoteArrayMeta> GetAllRoutesAsync(Program program) => Proxy.CallMethodAsync<RemoteArrayMeta>("getAllRoutes", program.Proxy.Data);
}
