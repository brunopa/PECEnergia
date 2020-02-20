using System;
using System.Collections.Generic;

namespace backend.DbModel
{
    public class Proprietario : IEntityBase
    {
        public uint id { get; set; }
        public bool principal { get; set; }
        public string nome { get; set; }
        public string nacionalidade { get; set; }
        public string profissao { get; set; }
        public string rg { get; set; }
        public string orgaoExpeditor { get; set; }
        public string documento { get; set; }
        public string estadoCivil { get; set; }
        public DateTime nascimento { get; set; }
        public string nomeConjuge { get; set; }
        public string nacionalidadeConjuge { get; set; }
        public string profissaoConjuge { get; set; }
        public string rgConjuge { get; set; }
        public string orgaoExpeditorConjuge { get; set; }
        public string documentoConjuge { get; set; }
        public string estadoCivilConjuge { get; set; }
        public DateTime nascimentoConjuge { get; set; }
        public string endereco { get; set; }
        public string cidade { get; set; }
        public string bairro { get; set; }
        public string numero { get; set; }
        public string complemento { get; set; }
        public Estado estado { get; set; }
        public string cep { get; set; }
        public string idTotvs { get; set; }

        public List<Imovel> imoveis { get; set; }
        public DBEntityState state { get; set; }
    }
}
