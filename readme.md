# sly的示例工程


### 概览

- 依赖：`jQuery 1.7` 
- 压缩后js的包大小：`15K` 
- 性能：`据说优化过，比原生好。由GPU加速`
- 主要文档：`index.html` `js/main.js` `css/main.css`

sly是一个非常不错的橱窗展示控件，功能很全面，但是[官网](http://darsa.in/sly/)只提供了源码和一些用例来展示，[github](https://github.com/darsain/sly)上也只有说明书，还略显简单了。主要还是没有工程源码，从头搭建起来还是有些麻烦，本工程提供了较为相应的工程源码，尽可能多的提供sly所有的功能，并注释配置信息的含义，从而使得sly这个插件更容易上手。

该插件支持[横向](http://darsa.in/sly/examples/horizontal.html)、[垂直](http://darsa.in/sly/examples/vertical.html)、[全屏](http://darsa.in/sly/examples/fullpage.html)、[无限滚动](http://darsa.in/sly/examples/infinite.html)、[视差（parallax）模式](http://darsa.in/sly/examples/parallax.html)，本工程只包含横向模式。简单测试后发现不支持移动端。

### Html和CSS
[官方文档](https://github.com/darsain/sly/blob/master/docs/Markup.md)
>
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

其中div.scrollBar为滚动条，button.backward和button.forward是两边的滚动按钮，div.frame是内容列表显示区域，div.controls是一些控制元素，包括但不限于滚到最前、上一个、增加一个列表元素、减少一个列表元素、下一个、滚动最后。
>
    .example .frame { margin: 0 auto; width: 940px; height: 200px; line-height: 200px; overflow: hidden; text-shadow: none; }
    .example .frame ul { list-style: none; margin: 0; padding: 0; height: 100%; font-size: 50px; }
    .example .frame ul li { float: left; width: 190px; height: 100%; margin: 0 1px 0 0; padding: 0; background: #eee; color: #3a3c47; text-align: center; cursor: pointer; }
    .example .frame ul li.active { color: #fff; background: #82bf4c; }
    
官方展示例子使用了px作为单位，实际测试过可以使用%来实现一定程度的自适应，需要对样式进行修改。

### 调用
[官方文档](https://github.com/darsain/sly/blob/master/docs/Calling.md)

>var sly = new Sly(frame, options, callbackMap).init();

`frame`表示html元素，`options`设置该组件的运行选项，`callbackMap`为回调函数，可不写，创建实例后直接初始化。

### 选项
[官方文档](https://github.com/darsain/sly/blob/master/docs/Options.md)

这一部分控制了整个插件的运行，比较关键。本工程并未用到下文代码的所有属性。

>
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
    
    // 滚动条，随frame滚动而滚动
    scrollBar:     null,  // Selector or DOM element for scrollbar container.
    dragHandle:    false, // Whether the scrollbar handle should be draggable.
    dynamicHandle: false, // Scrollbar handle represents the ratio between hidden and visible content.
    minHandleSize: 50,    // Minimal height or width (depends on sly direction) of a handle in pixels.
    clickBar:      false, // Enable navigation by clicking on scrollbar.
    syncSpeed:     0.5,   // Handle => SLIDEE synchronization speed, where: 1 = instant, 0 = infinite.