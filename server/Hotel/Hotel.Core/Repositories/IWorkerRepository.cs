using Hotel.Core.Entities;
using Hotel.Core.Hotel;
using Hotel.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Core.Repositories
{
    public interface IWorkerRepository
    {
       
        Task<List<Worker>> GetAllWorkersAsync();
        Task<Worker> GetWorkerByIdAsync(int id);
        Task<Worker> AddWorkerToWorkersAsync(Worker worker);
        Task<Worker> UpdateWorkerByIdAsync(int id,Worker worker);
        Task<Worker> ChangeStatusAsync(int id);
    }
}
