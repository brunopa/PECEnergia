using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DbModel;
using Microsoft.AspNetCore.Cors;
using System.Threading;
using Microsoft.AspNetCore.Authorization;
using backend.Services;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using backend.Helpers;

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Fichas")]
    [EnableCors("MyPolicy")]
    //[Authorize]
    public class FichasController : Controller
    {
        private readonly PECEnegiaContext _context;

        public FichasController(PECEnegiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult Index([FromQuery]String nome)
        {
            var list = from f in _context.Ficha
                       join fp in _context.FichaProprietario on f.id equals fp.fichaId
                       join p in _context.Proprietario on fp.proprietarioId equals p.id
                       where fp.principal == true
                       && p.nome.Contains(nome)
                       select new
                       {
                           f.id,
                           p.nome,
                           f.dataInclusao
                       };
            return Ok(list);
        }
        /*


         */
        [HttpGet("{id}")]
        [EnableCors("MyPolicy")]
        public IActionResult GetFicha([FromRoute] int id)
        {
            var list = _context.Ficha
            .Include(c => c.imovel)
            .ThenInclude(t => t.estado)
            .Include(c => c.conta)
            .Include(c => c.proprietarios)
            .ThenInclude(c => c.proprietario)
            .ThenInclude(t => t.estado)
            .Where(i => i.id == id)
            .Single();
            return Ok(list);
        }

        [HttpPut("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PutFicha([FromRoute] uint id, [FromBody] Ficha ficha)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ficha.id)
            {
                return BadRequest();
            }
            try
            {
                _context.Entry(ficha).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FichaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return NoContent();
        }

        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostFicha([FromBody] Ficha ficha)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Ficha.Add(ficha);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFicha", new { id = ficha.id }, ficha);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFicha([FromRoute] uint id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ficha = await _context.Ficha.SingleOrDefaultAsync(m => m.id == id);
            if (ficha == null)
            {
                return NotFound();
            }

            _context.Entry(ficha).State = EntityState.Deleted;

            await _context.SaveChangesAsync();

            return Ok(ficha);
        }

        private bool FichaExists(uint id)
        {
            return _context.Ficha.Any(e => e.id == id);
        }
    }
}