using Hotel.Core.Models;
using Hotel.Core.Repositories;
using Hotel.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Service
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<Role> AddRoleAsync(Role role)
        {
          await  _roleRepository.AddRoleToRolsAsync(role);
            return role;
        }

        public void DeleteRole(int roleId)
        {
            _roleRepository.DeleteRoleFromRols(roleId);
        }

        //public async Task<Role> GetRoleAsync(int id)
        //{
        //   return await _roleRepository.GetRoleByIdAsync(id);    
        //}

        public async Task<List<Role>> GetRolesAsync()
        {
            return await _roleRepository.GetAllRolesAsync();
        }

       
    }

}
