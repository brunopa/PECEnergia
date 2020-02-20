using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using backend.DbModel;
//Scaffold-DbContext "Server=localhost;Database=expomus;uid=root;pwd=191624;" Pomelo.EntityFrameworkCore.MySql -OutputDir Models
namespace backend.DbModel
{
    public partial class PECEnegiaContext : DbContext
    {
        public virtual DbSet<Proprietario> Proprietario { get; set; }
        public virtual DbSet<User> Usuario { get; set; }
        public virtual DbSet<Ficha> Ficha { get; set; }
        public virtual DbSet<FichaProprietario> FichaProprietario { get; set; }
        public virtual DbSet<Estado> Estado { get; set; }

        public PECEnegiaContext() : base()
        {
        }

        public PECEnegiaContext(DbContextOptions<PECEnegiaContext> ctx) : base(ctx)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");
            });

            modelBuilder.Entity<Ficha>(entity =>
            {
                entity.ToTable("ficha");
                entity.HasOne(d => d.conta);
                entity.HasOne(d => d.imovel);
                entity.HasMany(d => d.proprietarios);
                entity.Ignore(c => c.state);
            });

             modelBuilder.Entity<FichaProprietario>(entity =>
            {
                entity.ToTable("ficha_proprietario");
                entity.Ignore(c => c.state);
            });


            modelBuilder.Entity<Conta>(entity =>
            {
                entity.ToTable("conta");
                entity.Ignore(c => c.state);
            });

            modelBuilder.Entity<Imovel>(entity =>
            {
                entity.ToTable("imovel");
                entity.HasOne(d => d.estado);
                entity.Ignore(c => c.state);
            });

            modelBuilder.Entity<Proprietario>(entity =>
            {
                entity.ToTable("proprietario");
                //entity.HasOne(d => d.estado);
                //entity.HasMany(d => d.imoveis);
                entity.Ignore(c => c.state);
            });


            modelBuilder.Entity<FileUpload>(entity =>
            {
                entity.ToTable("fileupload");
            });

        }
    }
}
