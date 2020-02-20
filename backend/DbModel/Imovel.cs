using System;
using System.Collections.Generic;

namespace backend.DbModel
{
    public partial class Imovel : IEntityBase
    {
        public uint id { get; set; }
        public string nome { get; set; }
        public int situacao { get; set; }
        public string municipio { get; set; }
        public Estado estado { get; set; }
        public string area { get; set; }
        public string matricula { get; set; }
        public string cri { get; set; }
        public string ccir { get; set; }
        public string nrf { get; set; }
        public DBEntityState state { get; set; }
    }
}