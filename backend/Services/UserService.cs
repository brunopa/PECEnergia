using backend.DbModel;
using backend.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
        string SetTheme(int userID, string theme);
    }

    public class UserService : IUserService
    {
        private PECEnegiaContext _context;
        public UserService(PECEnegiaContext context)
        {
            _context = context;
        }

        public string SetTheme(int userID, string theme)
        {
            var user = _context.Usuario.SingleOrDefault(x => x.id == userID);
            user.theme = theme;
            _context.Usuario.Update(user);
            _context.SaveChanges();
            return theme;
        }

        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Usuario.SingleOrDefault(x => x.email == email);


            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.passwordHash, user.passwordSalt))
                return null;

            if (!user.ativo)
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Usuario;
        }

        public User GetById(int id)
        {
            return _context.Usuario.Find(id);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Usuario.Any(x => x.email == user.email))
                throw new AppException("Username " + user.email + " is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.passwordHash = passwordHash;
            user.passwordSalt = passwordSalt;

            _context.Usuario.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.Usuario.Find(userParam.id);

            if (user == null)
                throw new AppException("User not found");

            if (userParam.email != user.email)
            {
                // username has changed so check if the new username is already taken
                if (_context.Usuario.Any(x => x.email == userParam.email))
                    throw new AppException("Username " + userParam.email + " is already taken");
            }

            // update user properties
            user.nome = userParam.nome;
            user.email = userParam.email;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.passwordHash = passwordHash;
                user.passwordSalt = passwordSalt;
            }

            _context.Usuario.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Usuario.Find(id);
            if (user != null)
            {
                _context.Usuario.Remove(user);
                _context.SaveChanges();
            }
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null)
                throw new ArgumentNullException("password");

            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            if (storedHash.Length != 64)
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");

            if (storedSalt.Length != 128)
                throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i])
                        return false;
                }
            }

            return true;
        }

        public static int? GetUserId(HttpContext context)
        {
            int id = 0;
            int.TryParse(context.User.Identity.Name, out id);
            if (id > 0)
            {
                return (int?)id;
            }

            throw new InvalidUserException();
        }
    }
}