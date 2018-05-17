import {RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

export class AppRouteReuseStrategy implements RouteReuseStrategy {

  static handles: {[key: string]: DetachedRouteHandle} = {};

  // 决定该路由及其子路由是否允许之后被复用
  shouldDetach(route: ActivatedRouteSnapshot): boolean {  // route，之前的路由

    // 总是返回true，对所有路由允许复用
    return true;
  }

  // 当路由离开时触发，缓存该分离的路由，可通过赋值null，来清除之前缓存的路由
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {  // route，之前的路由

    // 缓存路由
    AppRouteReuseStrategy.handles[this.getKey(route)] = handle;
  }

  // 决定该路由及其子路由是否允许被还原
  shouldAttach(route: ActivatedRouteSnapshot): boolean {  // route，当前的路由

    // 缓存中存在该路由时，允许还原
    return !!route.routeConfig && !!AppRouteReuseStrategy.handles[this.getKey(route)]
  }

  // 获取之前被缓存的路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {  // route，当前的路由

    if (!route.routeConfig) return null;

    return AppRouteReuseStrategy.handles[this.getKey(route)];
  }

  // 进入路由时触发，决定是否同一路由时复用该路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {

    return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  private getKey(route) {

    return route._routerState.url.replace(/\//g, '_');
  }
}
