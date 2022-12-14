import { readdir, stat } from 'fs';
import { join } from 'path';
import type { Plugin, ResolvedConfig } from 'vite';
import { green } from 'kolorist';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const tost = `ð¤©ä½ å¥½ï¼å¦ææ¨æè§åå®¹è¿ä¸éï¼å¨å³è¾¹é¾æ¥ç»ä¸ªstarå¦ðï¼https://github.com/jsxiaosi/vue-xs-admin`;

function getdirsize(dir: string, callback: (fileNumber: number, size: number) => void) {
  let size = 0;
  let fileNumber = 0;
  stat(dir, function (err, stats) {
    if (err) throw err; //å¦æåºé
    if (stats.isFile()) return callback(1, stats.size); //å¦ææ¯æä»¶

    readdir(dir, function (err, files) {
      //å¦ææ¯ç®å½
      if (err) throw err; //å¦æéåç®å½åºé
      if (files.length == 0) return callback(0, 0); //å¦æç®å½æ¯ç©ºç

      let count = files.length; //æä»¶æ°é
      for (let i = 0; i < files.length; i++) {
        getdirsize(join(dir, files[i]), function (_fileNumber: number, _size: number) {
          if (err) throw err;
          size += _size;
          fileNumber += _fileNumber;
          if (--count <= 0) {
            //å¦æç®å½ä¸­æææä»¶(æç®å½)é½éåå®æ
            callback(fileNumber, size);
          }
        });
      }
    });
  });
}

function bytesToSize(bytes: number, fixed = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(fixed))} ${sizes[i]}`;
}

export function viteBuildOuteInfo(): Plugin {
  let config: ResolvedConfig;
  let startTime: Dayjs, endTime: Dayjs;

  return {
    // æä»¶åç§°
    name: 'vite-build-oute-info',

    // è¯¥æä»¶å¨ plugin-vue æä»¶ä¹åæ§è¡ï¼è¿æ ·å°±å¯ä»¥ç´æ¥è§£æå°åæ¨¡æ¿æä»¶
    enforce: 'post',
    transformIndexHtml: {
      enforce: 'post',
      transform: () => {},
    },

    configResolved(resolvedConfig) {
      // å­å¨æç»è§£æçéç½®
      config = resolvedConfig;
    },

    // rollup.rollupå¨æ¯æ¬¡å¼å§æå»ºæ¶è°ç¨
    buildStart() {
      console.info(['', green(tost), ''].join('\n'));
      if (config.command === 'build') {
        startTime = dayjs(new Date());
      }
    },

    closeBundle() {
      if (config.command === 'build') {
        endTime = dayjs(new Date());
        getdirsize(config.build.outDir, (f, s) => {
          console.log(
            `\n${green(
              `æåå®æðï¼æåæä»¶æ°éï¼${f}ï¼ç¨æ¶ï¼${dayjs
                .duration(endTime.diff(startTime))
                .format('mmåssç§')}ï¼æååçå¤§å°ï¼${bytesToSize(s)}ï¼`,
            )}`,
          );
        });
      }
    },
  };
}

export default viteBuildOuteInfo;
