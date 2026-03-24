const statusEl = document.getElementById('serviceStatus');
const serviceMetaEl = document.getElementById('serviceMeta');
const taskSummaryEl = document.getElementById('taskSummary');
const taskListEl = document.getElementById('taskList');
const refreshBtn = document.getElementById('refreshBtn');
const autoRefreshEl = document.getElementById('autoRefresh');
const apiBaseEl = document.getElementById('apiBase');
const taskTemplate = document.getElementById('taskItemTemplate');

const statusClassByValue = {
  healthy: 'ok',
  ok: 'ok',
  degraded: 'degraded',
  down: 'down',
};

let refreshTimer;

function setLoading() {
  statusEl.className = 'status loading';
  statusEl.textContent = 'Loading…';
  serviceMetaEl.innerHTML = '';
  taskSummaryEl.textContent = 'Loading tasks…';
  taskListEl.innerHTML = '';
}

function setStatus(status, meta = {}) {
  const normalized = (status || 'unknown').toString().toLowerCase();
  const className = statusClassByValue[normalized] || 'loading';

  statusEl.className = `status ${className}`;
  statusEl.textContent = normalized.toUpperCase();

  const metaEntries = Object.entries(meta);
  if (!metaEntries.length) {
    serviceMetaEl.innerHTML = '<dt>Details</dt><dd>No metadata available</dd>';
    return;
  }

  serviceMetaEl.innerHTML = metaEntries
    .map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`)
    .join('');
}

function setTasks(tasks = []) {
  if (!tasks.length) {
    taskSummaryEl.textContent = 'No tasks currently in process.';
    taskListEl.innerHTML = '';
    return;
  }

  taskSummaryEl.textContent = `${tasks.length} task(s) currently in process`;
  taskListEl.innerHTML = '';

  tasks.forEach((task) => {
    const item = taskTemplate.content.firstElementChild.cloneNode(true);
    item.querySelector('.task-title').textContent = task.name || task.id || 'Unnamed task';
    item.querySelector('.task-progress').textContent =
      task.progress != null ? `Progress: ${task.progress}%` : 'Progress: n/a';
    item.querySelector('.task-meta').textContent =
      `Owner: ${task.owner || 'n/a'} • Started: ${task.startedAt || 'n/a'}`;
    taskListEl.appendChild(item);
  });
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`);
  }

  return response.json();
}

function getFallbackData() {
  return {
    status: {
      state: 'degraded',
      meta: {
        version: 'unknown',
        note: 'Unable to reach API; showing fallback data',
      },
    },
    tasks: [
      {
        id: 'sample-1',
        name: 'Ingest daily records',
        progress: 42,
        owner: 'scheduler',
        startedAt: new Date().toISOString(),
      },
    ],
  };
}

async function refreshDashboard() {
  const base = apiBaseEl.value.replace(/\/$/, '');

  try {
    const [statusPayload, tasksPayload] = await Promise.all([
      fetchJson(`${base}/api/openclaw/status`),
      fetchJson(`${base}/api/openclaw/tasks?state=in_process`),
    ]);

    setStatus(statusPayload.state, statusPayload.meta);
    setTasks(tasksPayload.tasks || tasksPayload);
  } catch (error) {
    console.warn(error);
    const fallback = getFallbackData();
    setStatus(fallback.status.state, fallback.status.meta);
    setTasks(fallback.tasks);
    taskSummaryEl.textContent += ' (fallback)';
  }
}

function resetAutoRefresh() {
  clearInterval(refreshTimer);

  if (!autoRefreshEl.checked) {
    return;
  }

  refreshTimer = setInterval(refreshDashboard, 15000);
}

refreshBtn.addEventListener('click', refreshDashboard);
autoRefreshEl.addEventListener('change', resetAutoRefresh);

setLoading();
refreshDashboard();
resetAutoRefresh();
