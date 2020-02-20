
using System;
using System.Collections;
using System.Collections.Generic;
using AutoMapper;
using backend.DbModel;
using backend.Dto;
using System.Linq;

namespace backend.Helpers

{
    public static class Util
    {
        public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
        {
            if (source == null)
                return;

            source.ToList().ForEach(action);
        }

        public static void ForEachNull<T>(this IEnumerable<T> source, Action<T> action)
        {
            if (source == null)
                return;

            source.ForEach(action);
        }

        public static string WildCard { get { return "*";} }
    }
}