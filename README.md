# Flex-show 
   演示地址:https://sc125879.github.io/Flex-show/

flex 布局演示 
1、父级属性设置

  1）flex-direction 设定主轴排列方向
     row(默认):水平方向，从左向右
     row-reverse:水平方向，从右向左
     column:垂直方向，从上到下
     column-reverse:垂直方向，从下到上
     
   2) justify-content 设定主轴上的对齐方式
     flex-start(默认): 左对齐
     flex-end:右对齐
     center:居中
     space-between:两端对齐,元素之间间隔相同
     space-around:项目两端的间隔相同，靠近父元素边框的元素距离父元素边框是相邻元素间隔的一般。说白了就是每个元素平分间隔，且不重叠。
     
  3) align-items 交叉轴对齐方式
     stretch(默认): 如果项目未设置高度或设置为auto,将占满整个容器的高度
     flex-start:交叉轴的起点对齐（交叉轴就是与主轴相反的那个，比如主轴为row，交叉轴就是垂直方向,不如叫它拧巴轴:d）
     flex-end:交叉轴的终点对齐
     center:交叉轴的中点对齐 (应该适合与justify-content来做居中吧)
     baseline:第一行文字的基线对齐
     
  4) flex-wrap
     nowrap(默认):不换行
     wrap：换行，多的在下方另起一行
     wrap-reverse:与上面相反
  5) align-content 多轴情况下，设置flex-wrap及多行或多列情况下才生效
     stretch(默认): 轴线占满整个交叉轴
     flex-start：与交叉轴的起点对齐。
     flex-end：与交叉轴的终点对齐。
     center：与交叉轴的中点对齐。
     space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
     space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  
2、子元素属性设置
  1) order:0
  2) flex:0 1 auto(默认）
  flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
  3) align-self: auto

未完待续....
