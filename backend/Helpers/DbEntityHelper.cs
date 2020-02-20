using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using backend.DbModel;
using Microsoft.EntityFrameworkCore;

namespace backend.Helpers
{
    public class DbEntityHelper
    {
        public static void SetEntityState(DbContext _context, IEntityBase entity)
        {
            if (entity != null)
            {
                if (entity.state == DBEntityState.deleted)
                {
                    _context.Entry(entity).State = EntityState.Deleted;
                }
                else
                {
                    if (entity.id > 0)
                    {
                        _context.Entry(entity).State = EntityState.Modified;
                    }
                    else
                    {
                        _context.Add(entity);
                        _context.Entry(entity).State = EntityState.Added;
                    }

                }
            }
        }

        public static int? GetForeignEntityId(DbContext _context, IEntityBase foreignEntity)
        {
            if (foreignEntity != null)
            {
                if (foreignEntity.id > 0)
                {
                    _context.Entry(foreignEntity).State = EntityState.Unchanged;
                    return (int?)foreignEntity.id;
                }
                else
                {
                    _context.Entry(foreignEntity).State = EntityState.Added;
                    return null;
                }

            }
            else
            {
                return null;
            }
        }


        public static int GetForeignEntityIdEFCoreFix(IEntityBase foreignEntity)
        {
            int ret = 0;

            if (foreignEntity != null && foreignEntity.id > 0)
            {
                return (int)foreignEntity.id;
            }

            foreignEntity = null;
            return ret;
        }

        public static int? GetForeignEntityIdNullEFCoreFix(IEntityBase foreignEntity)
        {
            int? ret = null;

            if (foreignEntity != null && foreignEntity.id > 0)
            {
                return (int?)foreignEntity.id;
            }
            foreignEntity = null;
            return ret;
        }



    }
}

