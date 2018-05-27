import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  menuList: any = [{
    type: 'link',  // link | ext-link | sub-menu
    icon: 'apps',
    text: '首页',
    path: '/',
    queryParams: null
  }, {
    type: 'link',
    icon: 'event_note',
    text: '工作记录',
    path: '/work',
    queryParams: null
  }, {
    type: 'sub-menu',
    icon: 'person',
    text: '用户中心',
    isOpened: true,
    children: [{
      type: 'link',
      icon: '',
      text: '用户信息',
      path: '/user/info',
      queryParams: null
    }, {
      type: 'link',
      icon: 'event_note',
      text: '用户设置',
      path: '/user/settings',
      queryParams: null
    }]
  }];

  ngOnInit() {
  }

  onClickSubMenu(e: MouseEvent) {
    e.stopPropagation();
  }
}
