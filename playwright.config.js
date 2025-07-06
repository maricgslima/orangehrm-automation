module.exports = {
  timeout: 30000,
  use: {
    headless: false,                // Exibe o navegador durante a execução
    screenshot: 'only-on-failure', // Tira print se o teste falhar
    video: 'retain-on-failure',    // Grava vídeo se falhar
    baseURL: 'https://opensource-demo.orangehrmlive.com',
  },
};