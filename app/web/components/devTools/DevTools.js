import React              from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor         from 'redux-devtools-log-monitor';
import DockMonitor        from 'redux-devtools-dock-monitor';

module.exports = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-I" changePositionKey="ctrl-Q" defaultIsVisible={false} defaultPosition="left">
    <LogMonitor />
  </DockMonitor>
);
