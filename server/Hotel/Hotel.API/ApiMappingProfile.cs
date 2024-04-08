using AutoMapper;
using Hotel.API.Models;
using Hotel.API.Models.Post;
using Hotel.Core.DTOs;
using Hotel.Core.Entities;
using Hotel.Core.Hotel;
using Hotel.Core.Models;

namespace Hotel.API
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<WorkerPostModel, Worker>();
            CreateMap<RolePostModel, Role>();
            CreateMap<WorkerRolePostModel, WorkerRole>();
        }
    }

}
