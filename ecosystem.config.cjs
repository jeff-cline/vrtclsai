module.exports = {
  apps: [
    {
      name: "vrtclsai",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: __dirname,
      instances: "max",
      exec_mode: "cluster",
      env: { NODE_ENV: "production" },
      max_memory_restart: "1G",
      kill_timeout: 5000,
    },
  ],
};
