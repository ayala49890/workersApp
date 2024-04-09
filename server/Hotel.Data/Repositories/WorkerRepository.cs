using Hotel.Core.Entities;
using Hotel.Core.Hotel;
using Hotel.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Data.Repositories
{
    public class WorkerRepository : IWorkerRepository
    {
        private readonly DataContext _context;

        public WorkerRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Worker>> GetAllWorkersAsync()
        {
            return await _context.Workers
                                 .Where(w => w.Status)
                                 .ToListAsync();
        }
        public async Task<Worker> GetWorkerByIdAsync(int id)
        {
            return await _context.Workers
                .Where(w => w.Id == id && w.Status)
                .Include(w => w.Roles)
                .FirstOrDefaultAsync();
        }



        public async Task<Worker> AddWorkerToWorkersAsync(Worker worker)
        {
            _context.Workers.Add(worker);
            await _context.SaveChangesAsync();
            return worker;

        }


        public async Task<Worker> ChangeStatusAsync(int id)
        {
            Worker worker = await _context.Workers.FirstAsync(w => w.Id == id);
            if (worker != null)
            {
                worker.Status = false;
            }
            await _context.SaveChangesAsync();
            return worker;
        }

        public async Task<Worker> UpdateWorkerByIdAsync(int id, Worker worker)
        {
            Worker w = await GetWorkerByIdAsync(id);
            w.Id = id;
            if (w != null)
            {
                w.FirstName = worker.FirstName;
                w.LastName = worker.LastName;
                w.StartWorkingDate = worker.StartWorkingDate;
                w.DateOfBirth = worker.DateOfBirth;
                w.Identity = worker.Identity;
                w.Gender = worker.Gender;
                w.Status = worker.Status;
                w.Roles = worker.Roles;
            }
            await _context.SaveChangesAsync();
            return _context.Workers.Include(roleWorker => roleWorker.Roles).ThenInclude(roleWorker => roleWorker.Role).FirstOrDefault(w => w.Id == id);

        }


    }
}
