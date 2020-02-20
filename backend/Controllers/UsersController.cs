using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Options;
using backend.Services;
using AutoMapper;
using backend.Dto;
using backend.DbModel;
using System.Threading;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers
{
    //[Authorize]
    [Produces("application/json")]
    [Route("api/Users")]
    [EnableCors("MyPolicy")]
    [Authorize]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
        private PECEnegiaContext _context;

        public UsersController(IUserService userService, IMapper mapper, IOptions<AppSettings> appSettings, PECEnegiaContext context)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _context = context;
        }

        [AllowAnonymous]//todo: remover
        [HttpGet("SetTheme")]
        public IActionResult SetTheme([FromQuery]int userID, [FromQuery]string theme)
        {
            var user = _userService.SetTheme(userID, theme);
            return Ok(theme);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            //var user = _userService.Authenticate(userDto.Email, userDto.Password);

            //if (user == null)
            //{
            var user = _context.Usuario.Where(u => u.email == userDto.Email).Single();
            //}

            if (user == null)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            //Thread.Sleep(1000);
            return Ok(new
            {
                id = user.id,
                email = user.email,
                nome = user.nome,
                token = tokenString,
                theme = user.theme
            });
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userDto);

            try
            {
                // save 
                _userService.Create(user, userDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }



        [AllowAnonymous]
        [HttpGet("RegisterHardEncode")]
        public IActionResult RegisterHardEncode()
        {
            User user = new User
            {

                nome = "Bruno",
                email = "bruno.hung@gmail.com",
                theme = "dark",
                ativo = true,
                admin = true
            };

            try
            {
                // save 
                _userService.Create(user, "senh@123");
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var userDtos = _mapper.Map<IList<UserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UserDto userDto)
        {
            // map dto to entity and set id
            var user = _mapper.Map<User>(userDto);
            user.id = id;

            try
            {
                // save 
                _userService.Update(user, userDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}