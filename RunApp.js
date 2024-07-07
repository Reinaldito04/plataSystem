const { exec } = require('child_process');

// Ejecuta el comando "cd plataSystem && npm run dev"
exec('cd plataSystem && npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error ejecutando "npm run dev": ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
});
