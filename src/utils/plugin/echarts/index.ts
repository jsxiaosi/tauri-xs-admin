import { BarChart, LineChart, MapChart, PieChart } from 'echarts/charts';
import {
  GeoComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import EchartsDarkTheme from './theme/dark.json';
import EchartsLightTheme from './theme/light.json';
import 'echarts-wordcloud';

echarts.registerTheme('light', EchartsLightTheme);
echarts.registerTheme('dark', EchartsDarkTheme);

echarts.use([
  GridComponent,
  LineChart,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  LegendComponent,
  CanvasRenderer,
  UniversalTransition,
  BarChart,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  PieChart,
]);

export default echarts;
