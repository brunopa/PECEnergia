import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {
  private static cache = new Map<string, [Date, any]>();

  public get<T>(key): T {
    const tuple = RequestCacheService.cache.get(key);
    if (!tuple) return null;

    const expires = tuple[0];
    const httpResponse = tuple[1];

    // Don't observe expired keys
    const now = new Date();
    if (expires && expires.getTime() < now.getTime()) {
      RequestCacheService.cache.delete(key);
      return null;
    }

    return httpResponse;
  }

  public set(key: string, value: any, ttl = null) {
    if (ttl) {
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + ttl);
      RequestCacheService.cache.set(key, [expires, value]);
    } else {
      RequestCacheService.cache.set(key, [null, value]);
    }
  }
}