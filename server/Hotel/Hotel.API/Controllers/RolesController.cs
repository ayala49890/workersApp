using Hotel.API.Models.Post;
using Hotel.Core.Models;
using Hotel.Core.Services;
using Hotel.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hotel.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;
        public RolesController(IRoleService roleService)
        {
            _roleService = roleService;
        }
        // GET: api/<RoleContFroller>
        [HttpGet]
        public async Task<ActionResult<List<Role>>> Get()
        {
            return Ok(await _roleService.GetRolesAsync());

        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel role)
        {
            var roleToAdd = new Role { Name = role.Name, IsAdministrative = role.IsAdministrative };
            return Ok(await _roleService.AddRoleAsync(roleToAdd));
        }


        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _roleService.DeleteRole(id);

        }
    }
}
