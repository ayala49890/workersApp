using AutoMapper;
using Hotel.Core.DTOs;
using Hotel.Core.Hotel;
using Hotel.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Core
{
    public  class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Worker, WorkerDto>().ReverseMap();

        }
    }
}
