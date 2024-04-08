using Hotel.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Core.Services
{
    public interface IRoleService
    {
        Task<List<Role>> GetRolesAsync();
       Task<Role> AddRoleAsync(Role role);
        void DeleteRole(int roleId);
        //List<Role> GetRoleAsync(int id);

    }
}
