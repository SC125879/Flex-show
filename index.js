// 父元素
let $flexParent = $('.flex-container');
// let $flexParent = $('.panel-body .contents');
let $setting = $('.setAttr>.option');//获取父元素属性设置按钮
//子元素
let $menuParent = $('.item-menu');//子元素属性菜单
let $editBtn = $('#editBtn');//确定修改按钮
let editItemId = '';//当前操作的子元素id值

// 父元素默认设置
let optionDefaultSetting = {
  'flex-direction': 'row',
  'justify-content': 'flex-start',
  'align-items': 'stretch',
  'flex-wrap': 'nowrap',
  'align-content': 'stretch'
};
//子元素默认值
let itemSetting = {
  'order': '0',
  'flex': '0 1 auto',
  'align-self': 'auto'
};
//子元素属性值列表
let itemsSetting = {
  'item1': itemSetting,
  'item2': itemSetting,
  'item3': itemSetting
}


/**
 * 1、功能初始化
 *    1.1绑定菜单事件
 *    1.2初始化父元素flex参数
*/
window.onload = function () {
  bind();
  setOpt();
}

//绑定事件
function bind() {
  // bindClick();
  $('input[type="radio"]').on('click', radioClick);
  // 添加或删除子元素
  $('#add').on('click', addItem);
  $('#del').on('click', delItem);
  //子元素事件委托
  $flexParent.on('click', '.flex-item', menu);
  $flexParent.on('click', checkMenu);
  $editBtn.on('click', setItemSetting);
  $menuParent.find('#cancelBtn').on('click', cancelMenu);
}

/**
 * 父元素属性设置栏绑定单选按钮单击事件 
 */
function radioClick() {
  //获取更改后的设置
  let opt = getOpt();
  console.log('更改父级样式', opt);
  //更新设置
  setOpt(opt);
}

/**
 * 更改flex父级样式
 * 遍历各个属性值并设置相应的属性
 */
function setOpt(opts = optionDefaultSetting) {
  for (let opt in opts) {
    $flexParent.css(opt, opts[opt]);
  }
}

/**
 *  radio事件处理函数
 *  用于获取更改后属性
 */
function getOpt() {
  let value = [];
  let i = 0;
  let changeSetting = {
    'flex-direction': '',
    'justify-content': '',
    'align-items': '',
    'flex-wrap': '',
    'align-content': ''
  };
  //获取每个属性更改后的值
  $setting.each(function () {
    value.push($(this).find('input:checked').attr('value'));
  })
  //保存至设置并返回
  for (let opt in changeSetting) {
    changeSetting[opt] = value[i]
    i++;
  }

  return changeSetting;
}

/**
 * 添加或删除子元素事件处理程序
 */
function addItem() {
  //子元素
  let id = $('.flex-item').length;
  // console.log(id);
  let item = `<div id='item${id + 1}' class='flex-item'>${id + 1}</div>`;
  $flexParent.append(item);
  //设置初始化元素的属性对象
  itemsSetting[`item${id + 1}`] = itemSetting;

  // console.log(itemsSetting);
}
function delItem() {
  let $flexItems = $('.flex-item');
  let index = $flexItems.length - 1;
  // 删除属性及元素
  delete itemsSetting[`item${index + 1}`];
  $($flexItems[index]).remove();
}

/**
 * 菜单栏
 */

let itemFlag = true; //flag用来判断修改当前元素时 是否点击其他元素 true：未点击  false:点击其他元素

//设定menu操作功能
/**
 * e 操作区事件委托
 * 1、修改按钮 属性设置
 * 2、更新按钮出现位置
 */
function menu(e) {
  getItemSetting(e);
  setMenu(e);
  // console.log(e);
}

//取消修改
function cancelMenu() {
  toggleMenu();
  itemFlag = true;
  // $(`#${editItemId}`).css('border', '0.5px solid skyblue');
  toggleItem(editItemId);
}

//设置当前子元素，修改菜单中的值为当前元素的属性
function getItemSetting(e) {
  let target = $(e.target);
  //查询旧设置
  let id = target.attr('id');//itemXXX
  let oldSett = itemsSetting[id];

  //设置当前元素边框
  //设置菜单值为旧设置
  $menuParent.find('#order').val(oldSett['order']);
  $menuParent.find('#flex').val(oldSett['flex']);
  $menuParent.find('#align-self').val(oldSett['align-self']);

  //设置要更新的子元素
  //如果在点击修改按钮之前点击了其他元素，则不修改当前子元素的id
  if (itemFlag) {
    editItemId = id;
  }

  // console.log(oldSett);

  //下面为错误取值  应该设置select的val值
  // $menuParent.find('#order').attr('value', oldSett.order);
  // $menuParent.find(`#align-self option[value=${oldSett['align-self']}]`).val(oldSett['align-self'])
  // $menuParent.find(`#align-self option[value=${oldSett['align-self']}]`).attr('selected', `selected`);
}

//修改子元素样式
function setItemSetting() {
  itemFlag = true;
  //获取子元素更改后的设置
  let order = $menuParent.find('#order').val();
  let flex = $menuParent.find('#flex').val();
  let alignSelf = $menuParent.find('#align-self').val();
  // console.log(order, flex, alignSelf);

  itemsSetting[editItemId.toString()] = {
    'order': order.toString(),
    'flex': flex.toString(),
    'align-self': alignSelf.toString()
  }

  console.log('修改:', editItemId, itemsSetting[editItemId]);
  // $(`#${editItemId}`).css('border', '0.5px solid skyblue');
  // $menuParent.css('width', 0).css('height', 0);
  toggleItem(editItemId);
  toggleMenu();

  setItemCss(editItemId)
}

//更改要修改的子元素的flex、order、align-self属性
function setItemCss(itemId) {
  let setting = itemsSetting[itemId];
  console.log(itemId);
  $(`#${itemId}`).css('order', setting.order).css('flex', setting.flex).css('align-self', setting['align-self']);
}

//menu出现位置
function setMenu({ 'offsetX': x, 'offsetY': y, 'target': t } = e) {
  // 取得子元素在父元素中的位置
  x += t.offsetLeft + 5;
  y += t.offsetTop + 5;
  if (x > 525) x = 400;
  if (y > 345) y = 345;
  // console.log(x, y);
  $menuParent.css('left', x).css('top', y).css('width', '151px').css('height', '125px')
  itemFlag = false;
  toggleItem(editItemId);
  // $(`#${editItemId}`).css('border', '2px solid black');
  // console.log(x, y);
}

//menu展开和消失
function toggleMenu() {
  let position = parseInt($menuParent.css('left'));
  // console.log(position,parseInt($menuParent.css('right')));
  if (position > 0) {
    $menuParent.css('width', '0').css('height', '0')
  } else {
    $menuParent.css('width', '151px').css('height', '125px');
  }
}

//改变正在修改属性子元素的边框样式
//子元素点击效果
function toggleItem(id) {
  if (itemFlag == false) {
    $(`#${id}`).css('border', '2px solid black');
  } else {
    $(`#${id}`).css('border', '0.5px solid skyblue');
  }
}

//检查当前元素修改属性时是否点击了其他元素，如果点击了其他元素则将此元素边框样式还原
//还原后将当前点击的元素设置为menu绑定元素
function checkMenu(e) {
  // console.log(e.target.id);
  if (e.target.id != editItemId) {
    itemFlag = true;
    // $(`#${editItemId}`).css('border', '0.5px solid skyblue');
    toggleItem(editItemId);
    editItemId = e.target.id;
    console.log(e.target.id, editItemId);
    if (editItemId == '') {
      toggleMenu();
    }
  }
}

