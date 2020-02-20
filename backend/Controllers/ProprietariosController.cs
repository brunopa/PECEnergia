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
    [Route("api/Proprietarios")]
    [EnableCors("MyPolicy")]
    [Authorize]
    public class ProprietariosController : Controller
    {
        private readonly PECEnegiaContext _context;

        public ProprietariosController(PECEnegiaContext context)
        {
            _context = context;
        }

        // GET: api/Proprietarios
        [HttpGet]
        public ActionResult Index(String nome)
        {
            var list = from p in _context.Proprietario
                       select new
                       {
                           id = p.id,
                           nome = p.nome,
                       };

            if (nome != Util.WildCard)
            {
                list = list.Where(p => p.nome.StartsWith(nome));
            }

            return Ok(list);
        }


        // PUT: api/Proprietarios/5
        [HttpPut("{id}")]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PutProprietario([FromRoute] uint id, [FromBody] Proprietario proprietario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != proprietario.id)
            {
                return BadRequest();
            }
            try
            {
                _context.Entry(proprietario).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProprietarioExists(id))
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

        // POST: api/Proprietarios
        [HttpPost]
        [EnableCors("MyPolicy")]
        public async Task<IActionResult> PostProprietario([FromBody] Proprietario proprietario)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Proprietario.Add(proprietario);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProprietario", new { id = proprietario.id }, proprietario);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // DELETE: api/Proprietarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProprietario([FromRoute] uint id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var proprietario = await _context.Proprietario.SingleOrDefaultAsync(m => m.id == id);
            if (proprietario == null)
            {
                return NotFound();
            }

            _context.Entry(proprietario).State = EntityState.Deleted;

            await _context.SaveChangesAsync();

            return Ok(proprietario);
        }

        private bool ProprietarioExists(uint id)
        {
            return _context.Proprietario.Any(e => e.id == id);
        }
    }
}