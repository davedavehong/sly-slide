# sly的示例工程

### 概览

- 依赖：`jQuery 1.7` 
- 压缩后js的包大小：`15K` 
- 性能：`据说优化过，比原生好。由GPU加速`
- 主要文档：`index.html` `js/main.js` `css/main.css`

sly是一个非常不错的橱窗展示控件，功能很全面，但是[官网](http://darsa.in/sly/)只提供了源码和一些用例来展示，[github](https://github.com/darsain/sly)上也只有说明书，还略显简单了。主要还是没有工程源码，从头搭建起来还是有些麻烦，本工程提供了较为相应的工程源码，尽可能多的提供sly所有的功能，并注释配置信息的含义，从而使得sly这个插件更容易上手。

该插件支持[横向](http://darsa.in/sly/examples/horizontal.html)、[垂直](http://darsa.in/sly/examples/vertical.html)、[全屏](http://darsa.in/sly/examples/fullpage.html)、[无限滚动](http://darsa.in/sly/examples/infinite.html)、[视差（parallax）模式](http://darsa.in/sly/examples/parallax.html)，本工程只包含横向模式。简单测试后发现不支持移动端。

---
### Html和CSS
[官方文档](https://github.com/darsain/sly/blob/master/docs/Markup.md)
```html
<div id="example" class="example">
    <div class="scrollBar">
        <div class="handle">
            <div class="mouseArea"></div>
        </div>
    </div>
    <button class="backward"><i class="icon-angle-left">往前滚动</i></button>
    <button class="forward"><i class="icon-angle-right">往后滚动</i></button>
    <div class="frame">
        <ul>
            <li class="">0</li>
            <li class="">1</li>
            <li class="">2</li>
            <li class="">3</li>
            <li class="">4</li>
            <li class="">5</li>
            <li class="">6</li>
            <li class="">7</li>
            <li class="">8</li>
        </ul>
    </div>
    <div class="controls">
        <button data-action="toStart"><i class="icon-double-angle-left"></i> 开始</button>
        <span class="divider"></span>
        <button class="prev"><i class="icon-angle-left"></i>上一页</button>
        <span class="divider"></span>
        <button data-action="add"><i class="icon-plus-sign">加加加</i></button>
        <button data-action="remove"><i class="icon-minus-sign">减减减</i></button>
        <span class="divider"></span>
        <button class="next">下一个<i class="icon-angle-right"></i></button>
        <span class="divider"></span>
        <button data-action="toEnd">结束<i class="icon-double-angle-right"></i></button>
    </div>
</div>
```
其中div.scrollBar为滚动条，button.backward和button.forward是两边的滚动按钮，div.frame是内容列表显示区域，div.controls是一些控制元素，包括但不限于滚到最前、上一个、增加一个列表元素、减少一个列表元素、下一个、滚动最后。

```css
.example .frame{ margin: 0 auto; width: 940px; height: 200px; line-height: 200px; overflow: hidden; text-shadow: none; }
.example .frame ul { list-style: none; margin: 0; padding: 0; height: 100%; font-size: 50px; }
.example .frame ul li { float: left; width: 190px; height: 100%; margin: 0 1px 0 0; padding: 0; background: #eee; color: #3a3c47; text-align: center; cursor: pointer; }
.example .frame ul li.active { color: #fff; background: #82bf4c; }
``` 
官方展示例子使用了px作为单位，实际测试过可以使用%来实现一定程度的自适应，需要对样式进行修改。

---
### 调用
[官方文档](https://github.com/darsain/sly/blob/master/docs/Calling.md)

>var sly = new Sly(frame, options, callbackMap).init();

`frame`表示html元素，`options`设置该组件的运行选项，`callbackMap`为回调函数，可不写，创建实例后直接初始化。

---
### 选项
[官方文档](https://github.com/darsain/sly/blob/master/docs/Options.md)

这一部分控制了整个插件的运行，比较关键。本工程并未用到下文代码的所有属性，主要是汉化了。
```javascript
var frame = new Sly('#frame', {
    horizontal: 1, // 切换到横向模式
    
    // 条目的基础导航
    itemNav:        centered,  // 'basic', 'centered'：“active元素不在边缘时居中”, 'forceCentered'：“始终居中”
    itemSelector:   null,  // Select only items that match this selector.
    smart:          1, // 重新定位active条目
    activateOn:     "click",  // actice条目被激活的事件
    activateMiddle: false, // 始终将active条目居中。 "forceCentered"，模式下生效.
    
    // 滚动
    scrollSource: null,  // 捕捉鼠标滚动事件的元素，默认为frame
    scrollBy:     1,     // 每次滚动的距离，单位PX。0表示不滚动。
    scrollHijack: 300,   // Milliseconds since last wheel event after which it is acceptable to hijack global scroll.
    scrollTrap:   false, // 当滚动到边缘时阻止滚动事件冒泡。
    
    // 拖动
    dragSource:    null,  // 拖动事件的元素，默认为frame
    mouseDragging: 1, // 开启鼠标指针的拖动功能
    touchDragging: 1, // 开启触控拖动功能
    releaseSwing:  1, // 滚动释放时候的动效
    swingSpeed:    0.2,   // 摆动同步速度, where: 1 = instant, 0 = infinite.没看懂
    elasticBounds: false, // 拖动条目可以离开frame边缘
    interactive:   null,  // 交互元素区。不知道干嘛的。
    
    // 滚动条，绑定frame滚动而滚动
    scrollBar:     null,  // Selector or DOM element for scrollbar container.
    dragHandle:    false, // Whether the scrollbar handle should be draggable.
    dynamicHandle: false, // Scrollbar handle represents the ratio between hidden and visible content.
    minHandleSize: 50,    // Minimal height or width (depends on sly direction) of a handle in pixels.
    clickBar:      false, // Enable navigation by clicking on scrollbar.
    syncSpeed:     0.5,   // Handle => SLIDEE synchronization speed, where: 1 = instant, 0 = infinite.
    
    // Pagesbar。啥，不知道
    pagesBar:       null, // Selector or DOM element for pages bar container.
    activatePageOn: null, // Event used to activate page. Can be: click, mouseenter, ...
    pageBuilder:          // Page item generator.
        function (index) {
            return '<li>' + (index + 1) + '</li>';
        },
    
    // 导航按钮
    forward:  null, // Selector or DOM element for "forward movement" button.
    backward: null, // Selector or DOM element for "backward movement" button.
    prev:     null, // Selector or DOM element for "previous item" button.
    next:     null, // Selector or DOM element for "next item" button.
    prevPage: null, // Selector or DOM element for "previous page" button.
    nextPage: null, // Selector or DOM element for "next page" button.
    
    // Automated cycling
    cycleBy:       null,  // Enable automatic cycling by 'items' or 'pages'.
    cycleInterval: 5000,  // Delay between cycles in milliseconds.
    pauseOnHover:  false, // Pause cycling when mouse hovers over the FRAME.
    startPaused:   false, // Whether to start in paused sate.
    
    // 混合选项
    moveBy:        300,     // 按住导航按钮时的移动速度
    speed:         0,       // 每毫秒动画速度，0为关闭动画
    easing:        'swing', // 渐变动画效果
    startAt:       null,    // 开始位置默认值
    keyboardNavBy: null,    // 开启键盘导航
    
    // 定义html元素的class名
    draggedClass:  'dragged', // Class for dragged elements (like SLIDEE or scrollbar handle).
    activeClass:   'active',  // Class for active items and pages.
    disabledClass: 'disabled' // Class for disabled navigation elements.
});
```
---
### 属性(Properties)
[官方文档](https://github.com/darsain/sly/blob/master/docs/Properties.md)

Sly提供了一些有用可读属性。本文未翻译全部。

#### #sly.options

类型: `JSON对象`

该对象是当前Sly实例的所有配置选项。

#### #sly.items

类型: 数组

sly实例中可支配元素为对象组成的数组。结构如下。

    [
        {
            el: DOMNode,  // Item element DOM node.
            start: 0,     // Item start of the FRAME position.
            center: -495, // Item center of the FRAME position.
            end: -990,    // Item end of the FRAME position.
            size: 151     // Item size in a corresponded Sly direction.
        },
        ...
    ]
    
根据sly的滚动规则，该属性可结合实例方法进行如下使用：
>sly.slideTo(sly.items[6].center); // 应用动画效果将第7个元素居中

但是实际上可以缩写如下：
>sly.toCenter(6);

你可以通过此属性检查实例元素是否在合适的位置。

###方法(Methods)

[官方文档](https://github.com/darsain/sly/blob/master/docs/Methods.md) ,提供了丰富的方法，通过实例对象直接调用。

#### #init()

初始化Sly实例，即设置所需风格，绑定函数函数。可被如下链式调用：

>var sly = new Sly(frame, options, callbackMap).init();

#### #reload()

重新计算元素的尺寸和位置，当sly实例元素被改变的时候调用，例如被移动、移除或者窗口重置。

#### #slideTo(position, [immediate])

动态滚动到指定位置。偏移量为以实例框架的起始位置算起的像素值。当以item引导时，最终位置会根据被折断元素作调整。

- `position` 整数，新的滑动位置。
- `[immediate]` 布尔值，当`true`时，不使用动画效果立即重定位。

#### #slideBy(delta, [immediate])

动态移动`delta`的距离。

该方法必须简写成  `sly.slideTo(sly.pos.dest + delta)`

#### #toStart([target], [immediate])

将目标移至Frame可见区域的头部。不适用于`centered`或者`forceCentered`的item导航方式。

类似的有`toEnd([target], [immediate])`，将目标元素移至尾部。

* [target] 多种类型都可以
* [immediate] 是否执行动画滑动

例程:

    // 普通情况
    sly.toStart(); // 将整个滑动条拉至起始位置。
    sly.toStart(true); // 将整个滑动条拉至起始位置，不使用动态效果。
    
    // Item方式的导航
    sly.toStart(2); // 将第三个item拉至顶部。
    sly.toStart($items.eq(1), true); // 将第二个item拉至顶部，不使用动态效果。

#### #toCenter([target], [immediate])

将目标元素居中，`toStart`中的例子同样适用于此。

#### #moveBy(speed)

开启持续的线性运动，到达边界时或者调用`stop()`方法时停止。

例程:
```javascript
     sly.moveBy(300); // 每秒300px的速度向前移动
     sly.moveBy(-200); // 每秒200px的速度向后移动
```
#### #activate(item, [immediate])

激活某个item，当`smart`开启时会进行进一步的导航。

#### #prev()
激活前一个item，相应的有`next()`方法激活下一个item

#### #pause([priority])

暂停自动循环。对应的方法时`resume([priority])`和`toggle()`

- [priority] `Int` 暂停优先级。默认100

这个优先级被用于内部的鼠标悬停的暂停功能一般用不到。但是当你考虑悬停太久后手动开启循环滚动时会用到。

#### #on(eventName, callback)

向Sly实例注册事件的回调函数。可用事件见Events文档。相应的有`one(eventName, callback)`方法，不过只执行一次，不会绑定。`off(eventName, [callback])`方法移除事件。

例程：
```javascript
    // 基础用法
    sly.on('load', function () {});
    
    // 多事件，单回调
    sly.on('load move', function () {});
    
    // 多事件，多回调
    sly.on('load move', [
        function () {},
        function () {}
    ]);
    
    // 回调封装为map对象
    sly.on({
        load: function () {},
        move: [
            function () {},
            function () {}
        ]
    }); 
```
---
### Events事件
[官方文档](https://github.com/darsain/sly/blob/master/docs/Events.md)

通过实例初始化时写入回调：
```javascript
    var frame = new Sly('#frame', options, {
        load: fn,
        move: [fn1, fn2] // Multiple callbacks
    }).init();
```    
```javascript
// 使用 .on(), .one() and .off() 方法:
    var frame = new Sly('#frame', options);
    
    // Register a callback to multiple events
    frame.on('load move', fn);
    
    // Register a callback that will be executed only once
    frame.one('load', fn);
    
    // Initiate Sly instance
    frame.init();
````
---
#### #Common arguments
#####this
触发事件时this的值为sly实例对象。

#####1st argument
所有回调将事件名称作为第一个形参。

例程:
```javascript
sly.on('load', function (eventName) {
    console.log(eventName); // 'load'
    console.log(this.pos);  // Sly position object
});
```
#### #active

当新的item被激活时触发。回调函数变量：

**eventName** `String` 事件名称

**itemIndex** `Int` 被激活的item的序号
例程：
```javascript
sly.on('active', function (eventName, itemIndex) {
        console.log(eventName + "=" + itemIndex);
    });
````

#### #cycle
每次循环间隔时触发。

回调函数形参：

**eventName** `String` Event name.
      
---
### Parallax
[官方文档](https://github.com/darsain/sly/blob/master/docs/Parallax.md)
sly支持视差效果，有需要的时候再研究一下