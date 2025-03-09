import api from './api.js';

const PORT = 3000;

api.listen(PORT, () => {
console.log(`API rodando na porta ${PORT}`);
});