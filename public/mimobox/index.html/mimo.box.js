<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MimoBox</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', Roboto, sans-serif; }
    body { background:#f5f5f5; color:#1a1a1a; }
    .header { background:#fff; padding:16px 32px; display:flex; align-items:center; flex-wrap:wrap; gap:20px; position:sticky; top:0; z-index:100; box-shadow:0 1px 3px rgba(0,0,0,0.05); border-bottom:1px solid #eee; }
    .logo { font-size:26px; font-weight:300; cursor:pointer; }
    .logo strong { font-weight:600; color:#d4729a; }
    .search-bar { flex:1; min-width:280px; display:flex; background:#f5f5f5; border-radius:8px; border:1px solid transparent; transition:0.2s; }
    .search-bar:focus-within { border-color:#d4729a; background:#fff; }
    .search-bar input { flex:1; border:none; padding:10px 16px; font-size:14px; outline:none; background:transparent; }
    .search-bar button { background:transparent; border:none; padding:0 16px; color:#666; cursor:pointer; font-size:14px; }
    .header-icons { display:flex; align-items:center; gap:24px; font-size:13px; color:#666; }
    .header-icons span { cursor:pointer; display:flex; align-items:center; gap:4px; transition:0.2s; }
    .header-icons span:hover { color:#d4729a; }
    .login-btn { background:#1a1a1a; color:#fff; padding:8px 20px; border-radius:6px; font-weight:500; cursor:pointer; border:none; font-size:13px; }
    .user-menu { position:relative; display:inline-block; }
    .user-greeting { color:#1a1a1a; font-weight:500; cursor:pointer; padding:6px 0; font-size:13px; }
    .dropdown-content { display:none; position:absolute; right:0; background:#fff; min-width:200px; box-shadow:0 8px 24px rgba(0,0,0,0.1); border-radius:8px; z-index:101; border:1px solid #eee; }
    .dropdown-content a { color:#333; padding:12px 16px; text-decoration:none; display:block; cursor:pointer; font-size:13px; }
    .dropdown-content a:hover { background:#f9f5f7; color:#d4729a; }
    .user-menu:hover .dropdown-content { display:block; }
    .sub-header { background:#fff; padding:0 32px; display:flex; gap:0; border-bottom:1px solid #eee; flex-wrap:wrap; }
    .sub-header span { cursor:pointer; font-weight:400; font-size:13px; color:#666; padding:14px 20px; border-bottom:2px solid transparent; transition:0.2s; }
    .sub-header span:hover { color:#1a1a1a; border-bottom-color:#d4729a; }
    .main-container { max-width:1400px; margin:0 auto; padding:32px 24px; min-height:70vh; }
    .section-title { font-size:20px; font-weight:500; margin-bottom:24px; color:#1a1a1a; }
    .product-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(240px,1fr)); gap:24px; }
    .product-card { background:#fff; border-radius:4px; border:1px solid #eee; overflow:hidden; position:relative; transition:0.2s; }
    .product-card:hover { box-shadow:0 4px 16px rgba(0,0,0,0.06); }
    .favorite-btn { position:absolute; top:12px; right:12px; background:#fff; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:5; border:1px solid #eee; font-size:14px; }
    .favorite-btn.active { color:#d4729a; border-color:#d4729a; }
    .product-image { width:100%; aspect-ratio:1/1; background:#fafafa; display:flex; align-items:center; justify-content:center; padding:20px; border-bottom:1px solid #f5f5f5; overflow:hidden; }
    .product-image img { max-width:100%; max-height:100%; object-fit:contain; }
    .product-info { padding:16px; }
    .product-name { font-size:13px; font-weight:400; line-height:1.5; margin-bottom:8px; cursor:pointer; color:#333; }
    .product-name:hover { color:#d4729a; }
    .product-price { font-size:18px; font-weight:500; margin:8px 0; color:#1a1a1a; }
    .buy-button { background:#1a1a1a; color:#fff; border:none; font-weight:500; padding:10px; border-radius:4px; width:100%; cursor:pointer; font-size:13px; }
    .buy-button:hover { background:#d4729a; }
    .footer { background:#fff; color:#999; padding:40px 24px; margin-top:60px; text-align:center; border-top:1px solid #eee; font-size:13px; }
    .size-selector { display:flex; flex-wrap:wrap; gap:8px; margin:16px 0; }
    .size-btn { padding:8px 20px; border:1px solid #ddd; background:#fff; border-radius:4px; cursor:pointer; font-size:13px; }
    .size-btn.selected { background:#1a1a1a; color:#fff; border-color:#1a1a1a; }
    .cart-item { display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-bottom:1px solid #eee; }
    .cart-item-info { display:flex; align-items:center; gap:12px; }
    .cart-item-img { width:60px; height:60px; background:#fafafa; border-radius:4px; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; }
    .cart-item-img img { max-width:100%; max-height:100%; object-fit:contain; }
    .checkout-container { max-width:1100px; margin:0 auto; }
    .checkout-row { display:flex; gap:32px; flex-wrap:wrap; }
    .checkout-col { flex:1; min-width:320px; }
    .checkout-summary { background:#fff; padding:24px; border-radius:4px; border:1px solid #eee; }
    .checkout-item { display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid #f5f5f5; }
    .checkout-item-img { width:60px; height:60px; display:flex; align-items:center; justify-content:center; background:#fafafa; border-radius:4px; overflow:hidden; flex-shrink:0; }
    .checkout-item-img img { max-width:100%; max-height:100%; object-fit:contain; }
    .address-form input, .address-form select { width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:4px; font-size:13px; }
    .btn { background:#1a1a1a; color:#fff; border:none; padding:12px; border-radius:4px; font-weight:500; cursor:pointer; width:100%; font-size:14px; }
    .btn-outline { background:#fff; color:#1a1a1a; border:1px solid #ddd; }
    .frete-option-item { display:flex; align-items:center; gap:12px; padding:12px; border:1px solid #ddd; border-radius:4px; margin-bottom:8px; background:#fff; cursor:pointer; font-size:13px; }
    .frete-option-item.selected { border-color:#d4729a; background:#fdf6f9; }
    .error { color:#c0392b; font-size:12px; margin-top:8px; }
    .placeholder-img { background:#fafafa; display:flex; align-items:center; justify-content:center; color:#ddd; width:100%; height:100%; font-size:40px; }
    .related-section { margin-top:40px; }
    .related-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(180px,1fr)); gap:16px; }
    .auth-container, .account-container { max-width:440px; margin:40px auto; background:#fff; padding:32px; border-radius:4px; border:1px solid #eee; }
    .auth-tabs { display:flex; margin-bottom:24px; }
    .auth-tab { flex:1; text-align:center; padding:10px; cursor:pointer; border-bottom:2px solid #eee; font-size:14px; color:#999; }
    .auth-tab.active { border-bottom-color:#d4729a; color:#1a1a1a; }
    .auth-form input { width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:4px; font-size:13px; }
    .global-error { background:#fef2f2; color:#c0392b; padding:12px; text-align:center; margin-bottom:16px; border-radius:4px; display:none; font-size:13px; }
    .global-error.show { display:block; }
    .account-field { margin-bottom:16px; }
    .account-field label { font-weight:500; display:block; margin-bottom:4px; font-size:13px; color:#666; }
    .home-logo { text-align:center; margin-bottom:32px; padding:40px 0; }
    .home-logo h1 { font-size:56px; font-weight:300; }
    .home-story { background:#fff; padding:32px; border:1px solid #eee; margin-bottom:40px; text-align:center; }
    .toast-banner { position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#1a1a1a; color:#fff; padding:12px 24px; border-radius:4px; font-size:13px; z-index:9999; animation:slideDown 0.3s ease, fadeOut 0.3s ease 2s forwards; max-width:90vw; }
    .toast-banner.success { background:#27ae60; }
    @keyframes slideDown { from { top:-80px; opacity:0; } to { top:20px; opacity:1; } }
    @keyframes fadeOut { from { opacity:1; } to { opacity:0; visibility:hidden; } }
    .admin-container { max-width:900px; margin:0 auto; }
    .admin-form { background:#fff; padding:24px; border-radius:4px; border:1px solid #eee; margin-bottom:24px; }
    .admin-form input, .admin-form textarea, .admin-form select { width:100%; padding:10px; margin:8px 0; border:1px solid #ddd; border-radius:4px; font-size:13px; }
    .admin-table { width:100%; border-collapse:collapse; background:#fff; border-radius:4px; overflow:hidden; border:1px solid #eee; }
    .admin-table th { background:#fafafa; padding:12px; text-align:left; font-size:12px; }
    .admin-table td { padding:10px 12px; border-bottom:1px solid #f5f5f5; font-size:13px; }
    .admin-btn { padding:6px 14px; border:none; border-radius:4px; cursor:pointer; font-weight:500; margin:2px; font-size:12px; }
    .admin-btn.edit { background:#f5f5f5; color:#1a1a1a; }
    .admin-btn.delete { background:#fef2f2; color:#c0392b; }
    .admin-btn.save { background:#1a1a1a; color:#fff; width:100%; padding:12px; font-size:14px; }
    .remove-item { background:none; border:none; cursor:pointer; font-size:16px; color:#999; }
    .result-count { font-size:13px; color:#999; margin-bottom:20px; }
    .no-results { text-align:center; padding:60px; color:#999; }
    /* PRODUCT PAGE */
    .product-page-container { display:flex; flex-wrap:wrap; gap:40px; max-width:1200px; margin:20px auto; background:#fff; padding:32px; border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,0.04); border:1px solid #eee; }
    .product-images { flex:1; min-width:300px; display:flex; flex-direction:column; align-items:center; }
    .product-details { flex:1; min-width:300px; }
    .product-details h1 { font-size:24px; font-weight:600; margin-bottom:12px; }
    .product-details .price { font-size:36px; font-weight:700; color:#27ae60; margin-bottom:8px; }
    .product-details .installments { font-size:14px; color:#555; margin-bottom:4px; }
    .product-details .pix-discount { font-size:14px; color:#27ae60; margin-bottom:16px; font-weight:500; }
    .product-details .frete-label { font-weight:500; margin-top:24px; margin-bottom:8px; font-size:15px; }
    .product-details .cep-group { display:flex; gap:8px; margin-bottom:24px; }
    .product-details .cep-group input { flex:1; padding:10px; border:1px solid #ddd; border-radius:4px; font-size:13px; }
    .product-details .cep-group button { width:auto; padding:10px 20px; white-space:nowrap; }
    .add-to-cart-btn, .buy-now-btn { width:100%; padding:16px; font-size:16px; font-weight:600; border-radius:6px; margin-bottom:10px; cursor:pointer; border:none; }
    .add-to-cart-btn { background:#1a1a1a; color:#fff; }
    .add-to-cart-btn:hover { background:#333; }
    .buy-now-btn { background:#27ae60; color:#fff; }
    .buy-now-btn:hover { background:#219a52; }
    /* CHECKOUT */
    .checkout-wrapper { max-width:1200px; margin:0 auto; }
    .checkout-header { text-align:center; padding:24px 0; }
    .checkout-header h2 { font-size:24px; font-weight:600; margin-bottom:8px; }
    .checkout-header .secure-badge { font-size:12px; color:#999; display:flex; align-items:center; justify-content:center; gap:4px; }
    .checkout-progress { display:flex; justify-content:center; gap:0; margin-bottom:32px; }
    .checkout-progress .step { display:flex; align-items:center; gap:8px; font-size:12px; color:#999; padding:0 20px; position:relative; }
    .checkout-progress .step.active { color:#d4729a; font-weight:600; }
    .checkout-progress .step .step-num { width:24px; height:24px; border-radius:50%; background:#eee; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600; }
    .checkout-progress .step.active .step-num { background:#d4729a; color:#fff; }
    .checkout-progress .step-divider { flex:0 0 40px; height:1px; background:#ddd; align-self:center; }
    .checkout-columns { display:flex; gap:32px; flex-wrap:wrap; }
    .checkout-main { flex:1.3; min-width:350px; display:flex; flex-direction:column; gap:20px; }
    .checkout-sidebar { flex:1; min-width:320px; }
    .checkout-card { background:#fff; border-radius:8px; padding:24px; border:1px solid #eee; box-shadow:0 1px 3px rgba(0,0,0,0.03); }
    .checkout-card h3 { font-size:16px; font-weight:600; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
    .checkout-card h3 .icon { font-size:20px; }
    .form-row { display:flex; gap:12px; flex-wrap:wrap; }
    .form-row .form-group { flex:1; min-width:120px; }
    .form-group { margin-bottom:14px; }
    .form-group label { display:block; font-size:12px; font-weight:500; color:#666; margin-bottom:4px; text-transform:uppercase; letter-spacing:0.5px; }
    .form-group input, .form-group select { width:100%; padding:12px 14px; border:1px solid #e0e0e0; border-radius:6px; font-size:14px; transition:0.2s; background:#fafafa; }
    .form-group input:focus, .form-group select:focus { outline:none; border-color:#d4729a; background:#fff; box-shadow:0 0 0 3px rgba(212,114,154,0.08); }
    .form-group input::placeholder { color:#bbb; }
    .payment-options { display:flex; flex-direction:column; gap:10px; }
    .payment-option { display:flex; align-items:center; gap:12px; padding:16px; border:2px solid #e0e0e0; border-radius:8px; cursor:pointer; transition:0.2s; background:#fff; }
    .payment-option:hover { border-color:#d4729a; background:#fdf6f9; }
    .payment-option.selected { border-color:#d4729a; background:#fdf6f9; }
    .payment-option input[type="radio"] { accent-color:#d4729a; width:18px; height:18px; }
    .payment-option .payment-icon { font-size:28px; }
    .payment-option .payment-info { flex:1; }
    .payment-option .payment-info strong { display:block; font-size:14px; }
    .payment-option .payment-info span { font-size:12px; color:#888; }
    .payment-option .payment-tag { background:#27ae60; color:#fff; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:600; }
    .summary-item { display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid #f5f5f5; }
    .summary-item:last-child { border-bottom:none; }
    .summary-item-img { width:55px; height:55px; background:#fafafa; border-radius:6px; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; }
    .summary-item-img img { max-width:100%; max-height:100%; object-fit:contain; }
    .summary-item-info { flex:1; }
    .summary-item-info strong { font-size:13px; display:block; margin-bottom:2px; }
    .summary-item-info span { font-size:11px; color:#888; }
    .summary-item-price { font-weight:600; font-size:14px; }
    .summary-totals { margin-top:16px; padding-top:12px; border-top:1px solid #eee; }
    .summary-totals .line { display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; color:#555; }
    .summary-totals .line.discount { color:#27ae60; }
    .summary-totals .line.total { font-size:18px; font-weight:700; color:#1a1a1a; margin-top:12px; padding-top:12px; border-top:2px solid #eee; }
    .coupon-row { display:flex; gap:8px; margin-top:12px; }
    .coupon-row input { flex:1; padding:10px 14px; border:1px solid #e0e0e0; border-radius:6px; font-size:13px; background:#fafafa; }
    .coupon-row input:focus { outline:none; border-color:#d4729a; }
    .coupon-row button { padding:10px 18px; background:#1a1a1a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:13px; font-weight:500; white-space:nowrap; }
    .coupon-row button:hover { background:#333; }
    .trust-badges { display:flex; justify-content:center; gap:16px; margin-top:20px; flex-wrap:wrap; }
    .trust-badges span { font-size:11px; color:#888; display:flex; align-items:center; gap:4px; }
    .confirm-btn { width:100%; padding:18px; font-size:16px; font-weight:700; background:#27ae60; color:#fff; border:none; border-radius:8px; cursor:pointer; margin-top:16px; letter-spacing:0.5px; }
    .confirm-btn:hover { background:#219a52; }
    .parcels-select { width:100%; padding:12px; border:1px solid #e0e0e0; border-radius:6px; font-size:14px; margin-top:10px; background:#fafafa; }
    .thanks-container { max-width:650px; margin:40px auto; background:#fff; border-radius:12px; padding:40px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.05); border:1px solid #eee; }
  </style>
</head>
<body>
<header class="header">
  <div class="logo" onclick="navigateTo('home')">mimo<strong>box</strong></div>
  <div class="search-bar"><input type="text" id="searchInput" placeholder="Buscar produtos..." autocomplete="off"><button id="searchBtn">Buscar</button></div>
  <div class="header-icons">
    <span onclick="navigateTo('favorites')">Favoritos</span>
    <span onclick="navigateTo('cart')">Carrinho (<span id="cartCount">0</span>)</span>
    <span id="authArea"></span>
  </div>
</header>
<div class="sub-header">
  <span onclick="navigateTo('home')">Início</span>
  <span onclick="setCategory('all')">Ofertas</span>
  <span onclick="setCategory('pelucia')">Pelúcia</span>
  <span onclick="setCategory('pijama')">Pijama</span>
  <span onclick="setCategory('pantufa')">Pantufa</span>
  <span onclick="setCategory('chinelo')">Chinelo</span>
  <span onclick="setCategory('box')">Box</span>
</div>
<main class="main-container" id="appContent"></main>
<footer class="footer">
  <p>mimo<strong>box</strong> &copy; 2026</p>
  <p style="margin-top:12px; font-size:13px; color:#888;">📧 Contato: <a href="mailto:jzstoreofc@gmail.com" style="color:#d4729a;">jzstoreofc@gmail.com</a></p>
</footer>

<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  // ==================== CONFIGURAÇÕES ====================
  emailjs.init("2Pa0OkjywyelMad_8");
  const EMAIL_SERVICE_ID = "service_5fynxmf";
  const EMAIL_TEMPLATE_ID = "template_3v7274e";

  const ADMIN_EMAIL = atob('am9jYXJvZHJpZ3VlczE3MDlAZ21haWwuY29t');
  const ADMIN_PASSWORD = atob('NzE3MTkwam9jYQ==');
  const AUTHORIZED_IP = 'SEU_IP_AQUI';

  const PAYMENT_WORKER_URL = 'https://falling-credit-06a6.jzstoreofc.workers.dev/'; // Ajuste conforme necessário
  const PIX_KEY = 'sua-chave-pix@exemplo.com';   // Fallback manual
 

  // ==================== PRODUTOS (EXEMPLO) ====================
  
 const productsData = [
    { nome: "Pelúcia Pikachu", preco: 71.92, desc: "O Pikachu é o Pokémon mais icônico de todos os tempos..." },
    { nome: "Pelúcia Mickey Mouse", preco: 63.92, desc: "Mickey Mouse é o personagem mais emblemático da Disney..." },
    { nome: "Pelúcia Homem-Aranha", preco: 75.92, desc: "O Homem-Aranha é um dos super-heróis mais amados..." },
    { nome: "Pelúcia Hello Kitty", preco: 55.92, desc: "Hello Kitty é a personagem mais famosa da Sanrio..." },
    { nome: "Pelúcia Baby Yoda (Grogu)", preco: 79.92, desc: "Grogu, carinhosamente apelidado de Baby Yoda..." },
    { nome: "Pelúcia Sonic", preco: 67.92, desc: "Sonic the Hedgehog é o ouriço azul mais rápido..." },
    { nome: "Pelúcia Mario", preco: 71.92, desc: "Mario é o encanador bigodudo mais famoso..." },
    { nome: "Pelúcia Minion", preco: 59.92, desc: "Os Minions são as criaturinhas amarelas mais divertidas..." },
    { nome: "Pelúcia Panda", preco: 55.92, desc: "O panda é um dos animais mais adorados do mundo..." },
    { nome: "Chinelo Shark Stitch", preco: 47.92, desc: "O chinelo Shark une conforto e diversão..." },
    { nome: "Chinelo Crocs Homem-Aranha", preco: 51.92, desc: "Os Crocs do Homem-Aranha são o calçado perfeito..." },
    { nome: "Chinelo Nuvem Pikachu", preco: 43.92, desc: "O chinelo slide nuvem do Pikachu..." },
    { nome: "Box Pikachu", preco: 103.92, desc: "O Box Pikachu é a caixa de presente definitiva..." },
    { nome: "Box Hello Kitty", preco: 95.92, desc: "O Box Hello Kitty é um kit premium..." },
    { nome: "Pantufa Stitch", preco: 63.92, desc: "A pantufa 3D do Stitch é a companhia mais fofa..." },
    { nome: "Pantufa Pikachu", preco: 63.92, desc: "A pantufa do Pikachu é o acessório perfeito..." },
    { nome: "Chinelo Shark CINZA", preco: 69.85, desc: "O chinelo Shark na cor cinza combina design divertido..." },
    { nome: "Chinelo Shark Preto", preco: 68.90, desc: "O chinelo Shark preto é a escolha ideal..." },
    { nome: "Lilo stitch que respira", preco: 57.97, desc: "Esta pelúcia interativa transmite a respiração suave..." },
    { nome: "Macacão/Cobertor Pandinha", preco: 247.90, desc: "O Macacão Cobertor Pandinha é uma peça versátil..." },
    { nome: "Pantufa Baby Shark", preco: 68.97, desc: "A pantufa Baby Shark traz toda a diversão..." },
    { nome: "Pantufa Divertida", preco: 77.87, desc: "As pantufas divertidas são a combinação perfeita..." },
    { nome: "Pantufa Vaquinha", preco: 73.99, desc: "A pantufa de vaquinha é puro charme..." },
    { nome: "Pantufa garfield", preco: 69.99, desc: "A pantufa do Garfield é a companhia ideal..." },
    { nome: "Pijama Ariel Pequena Sereia", preco: 68.90, desc: "Este pijama da Princesa Ariel é o sonho..." },
    { nome: "Pijama Infantil Homem Aranha", preco: 78.87, desc: "O pijama do Homem-Aranha transforma a hora de dormir..." },
    { nome: "Pijama Macacão (Banguela)", preco: 99.89, desc: "O pijama macacão do Banguela (Toothless)..." },
    { nome: "Pijama Macacão e Cinnamoroll", preco: 117.85, desc: "O pijama macacão da Cinnamoroll é pura fofura..." },
    { nome: "Sandália Baby Yoda", preco: 97.90, desc: "A sandália Crocs do Baby Yoda (Grogu)..." },
    { nome: "Baby Burrinho Yó", preco: 29.90, desc: "O Baby Burrinho Yó é a versão mais fofa..." },
    { nome: "Box Da Copa", preco: 49.87, desc: "O Box da Copa é o presente perfeito..." },
    { nome: "Fut Box (TIMES)", preco: 69.85, desc: "A Fut Box é uma caixa surpresa temática de futebol..." },
    { nome: "Gato Dorminhoco 1m", preco: 69.97, desc: "O Gato Dorminhoco de 1 metro é uma pelúcia gigante..." },
    { nome: "Gund Pusheen Pétala de Flor Rosa", preco: 49.99, desc: "Esta pelúcia Gund traz a Pusheen..." },
    { nome: "Gund Pusheen pelúcia cinza", preco: 49.99, desc: "A pelúcia oficial Gund da Pusheen na cor cinza..." },
    { nome: "Gund pusheen pelucia rosa", preco: 47.99, desc: "A Pusheen rosa da Gund é a versão mais doce..." },
    { nome: "Lotso Toy Story", preco: 49.99, desc: "Lotso (Lots-o'-Huggin' Bear) é o ursinho rosa..." },
    { nome: "Love Box M", preco: 29.97, desc: "A Love Box M é uma caixa de presente romântica..." },
    { nome: "Lucifer o Gato", preco: 47.97, desc: "Lúcifer é o gato malvado da Madrasta..." },
    { nome: "Pelucia urso gigante", preco: 87.99, desc: "O urso de pelúcia gigante é o presente que impressiona..." },
    { nome: "Pelúcia Pusheen Squisheen", preco: 49.90, desc: "A Pusheen Squisheen é uma versão ainda mais fofa..." },
    { nome: "Pijama Infantil ONE PIECE", preco: 99.90, desc: "Este pijama do One Piece é o sonho de qualquer fã..." },
    { nome: "Ursinho Pooh", preco: 56.79, desc: "O Ursinho Pooh (Winnie the Pooh) é o personagem mais doce..." },
    { nome: "love Box GG", preco: 59.87, desc: "A Love Box GG é a versão mais completa..." }
  ];

  // ==================== ESTADO ====================
  let cart = JSON.parse(localStorage.getItem('mimoCart')) || [];
  let favorites = JSON.parse(localStorage.getItem('mimoFavorites')) || [];
  let currentUser = JSON.parse(localStorage.getItem('mimoUser')) || null;
  let usersDB = JSON.parse(localStorage.getItem('mimoUsers')) || [];
  let currentCategory = 'all';
  let searchQuery = '';
  let selectedProduct = null;
  let selectedSize = '';
  let selectedFreteType = 'economico';
  let cepValido = false;
  const FRETE_ECONOMICO = 19.30, FRETE_EXPRESS = 43.76;

  const COUPONS = [
    { code:'MIMO10', type:'percent', value:10 }, { code:'MIMO20', type:'percent', value:20 },
    { code:'FRETEGRATIS', type:'frete', value:100 }, { code:'PANTUFA15', type:'percent', value:15 },
    { code:'PELUCIA5', type:'fixed', value:5 }, { code:'BOASVINDAS', type:'percent', value:12 },
    { code:'NATAL25', type:'percent', value:25 }, { code:'BOX10', type:'fixed', value:10 },
    { code:'PROMO50', type:'fixed', value:50, minTotal:200 }, { code:'AMIGO30', type:'percent', value:30 }
  ];
  let appliedCoupon = null, couponDiscount = 0;

  // ==================== FUNÇÕES UTILITÁRIAS ====================
  function getItemImage(item) {
    const prod = loadAllProducts().find(p => p.nome === item.nome);
    if (!prod) return null;
    if (prod.imagens?.[0]) return prod.imagens[0];
    if (prod.imagemBase64) return prod.imagemBase64;
    if (prod.imagemUrl) return prod.imagemUrl;
    return null;
  }

  function loadAllProducts() {
    const custom = JSON.parse(localStorage.getItem('mimoCustomProducts')) || [];
    const hidden = JSON.parse(localStorage.getItem('mimoHiddenProducts')) || [];
    let natives = productsData.filter(p => !hidden.includes(p.nome) && !custom.some(c => c.nome === p.nome));
    if (natives.length === 0 && custom.length === 0 && hidden.length > 0) {
      localStorage.removeItem('mimoHiddenProducts');
      return [...productsData];
    }
    return [...natives, ...custom];
  }

  function normalize(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function updateCartCount() { const el = document.getElementById('cartCount'); if (el) el.textContent = cart.length; }
  function saveCart() { localStorage.setItem('mimoCart', JSON.stringify(cart)); updateCartCount(); }

  function getCategory(prod) {
    if (prod.categoria) return normalize(prod.categoria);
    const n = normalize(prod.nome);
    if (n.includes('pijama')||n.includes('macacao')||n.includes('cobertor')) return 'pijama';
    if (n.includes('pantufa')) return 'pantufa';
    if (n.includes('sandalia')) return 'chinelo';
    if (n.includes('chinelo')) return 'chinelo';
    if (n.includes('box')) return 'box';
    if (n.includes('pelucia')||n.includes('urso')||n.includes('stitch')||n.includes('pusheen')||n.includes('lotso')||n.includes('lilo')||n.includes('burrinho')||n.includes('gato')) return 'pelucia';
    return 'outros';
  }

  function getSizeOptions(cat, prod) {
    if (prod?.tamanhos?.length) return prod.tamanhos;
    if (cat==='pijama') return ['12','14','16','PP','P','M','G','GG'];
    if (cat==='pantufa'||cat==='chinelo') return ['34-35','36-37','38-39','40-41','41-42'];
    return [];
  }

  function getFreteValue() { return selectedFreteType==='express'?FRETE_EXPRESS:FRETE_ECONOMICO; }
  function getFreteName() { return selectedFreteType==='express'?'Express (2-3 dias)':'Econômico (4-7 dias)'; }

  function showToast(msg, type='info') {
    const t = document.createElement('div');
    t.className = `toast-banner ${type}`; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  }

  function updateAuthUI() {
    const area = document.getElementById('authArea');
    if (!area) return;
    if (currentUser) {
      const name = currentUser.nome.split(' ')[0];
      const adminLink = (currentUser.email === ADMIN_EMAIL) ? '<a onclick="navigateTo(\'admin\')">Administrar</a>' : '';
      area.innerHTML = `<div class="user-menu"><span class="user-greeting">Olá, ${name}</span><div class="dropdown-content"><a onclick="navigateTo('account')">Conta</a>${adminLink}<a onclick="logout()">Sair</a></div></div>`;
    } else {
      area.innerHTML = `<button class="login-btn" onclick="navigateTo('login')">Entrar</button>`;
    }
  }

  window.logout = () => { currentUser = null; localStorage.removeItem('mimoUser'); updateAuthUI(); navigateTo('home'); };

  function navigateTo(page, param) {
    if (page === 'home') window.location.hash = '#/';
    else if (page === 'products') window.location.hash = '#/products';
    else if (page === 'product') window.location.hash = `#/product/${encodeURIComponent(param)}`;
    else if (page === 'cart') window.location.hash = '#/cart';
    else if (page === 'favorites') window.location.hash = '#/favorites';
    else if (page === 'checkout') window.location.hash = '#/checkout';
    else if (page === 'thanks' && param) window.location.hash = `#/thanks?orderNumber=${param}`;
    else if (page === 'login') window.location.hash = '#/login';
    else if (page === 'account') window.location.hash = '#/account';
    else if (page === 'admin') window.location.hash = '#/admin';
  }
  window.navigateTo = navigateTo;

  window.setCategory = function(cat) {
    currentCategory = cat;
    searchQuery = '';
    document.getElementById('searchInput').value = '';
    window.location.hash = '#/products';
    setTimeout(() => renderProductListing(), 10);
  };

  // ==================== RENDERIZAÇÃO ====================
  function renderHomePage() {
    const prods = loadAllProducts();
    document.getElementById('appContent').innerHTML = `
      <div class="home-logo"><h1>mimo<strong>box</strong></h1><p>pequenos mimos, grandes sorrisos</p></div>
      <div class="home-story"><p>A mimo<strong>box</strong> nasceu de um sonho pequeno: levar carinho e alegria através de pelúcias e presentes especiais.<br><br>Obrigado por fazer parte da nossa história.</p></div>
      <h2 class="section-title">Produtos em destaque</h2>
      <div id="homeProducts">${renderProductGrid(prods.slice(0, 12))}</div>
      ${prods.length > 12 ? `<div style="text-align:center;margin-top:32px;"><button class="btn" style="max-width:280px;" id="loadMoreBtn">Ver mais produtos</button></div>` : ''}
      <div id="remainingProducts" style="display:none;"></div>`;
    if (prods.length > 12) {
      document.getElementById('loadMoreBtn').addEventListener('click', function() {
        const remaining = prods.slice(12);
        document.getElementById('remainingProducts').innerHTML = `<h2 class="section-title" style="margin-top:40px;">Mais produtos</h2>${renderProductGrid(remaining)}`;
        document.getElementById('remainingProducts').style.display = 'block';
        this.style.display = 'none';
        window.scrollTo({ top: document.getElementById('remainingProducts').offsetTop - 100, behavior: 'smooth' });
      });
    }
  }

  function renderProductListing() {
    const all = loadAllProducts();
    let filtered = all;
    if (searchQuery) filtered = filtered.filter(p => normalize(p.nome).includes(normalize(searchQuery)));
    if (currentCategory !== 'all') filtered = filtered.filter(p => getCategory(p) === currentCategory);
    const names = { all:'Ofertas', pelucia:'Pelúcia', pijama:'Pijama', pantufa:'Pantufa', chinelo:'Chinelo', box:'Box' };
    document.getElementById('appContent').innerHTML = `<h2 class="section-title">${searchQuery ? `Resultados para "${searchQuery}"` : names[currentCategory]}</h2><p class="result-count">${filtered.length} produto(s)</p>${renderProductGrid(filtered)}`;
  }

  function renderProductGrid(prods) {
    if (!prods || !prods.length) return '<div class="no-results">Nenhum produto.</div>';
    let g = '<div class="product-grid">';
    prods.forEach(p => {
      const fav = favorites.includes(p.nome);
      const price = p.preco.toLocaleString('pt-BR', {minimumFractionDigits:2});
      let img = '';
      if (p.imagens?.[0]) img = `<img src="${p.imagens[0]}" onerror="this.parentNode.innerHTML='<div class=placeholder-img>+</div>';">`;
      else if (p.imagemBase64) img = `<img src="${p.imagemBase64}" onerror="this.parentNode.innerHTML='<div class=placeholder-img>+</div>';">`;
      else if (p.imagemUrl) img = `<img src="${p.imagemUrl}" onerror="this.parentNode.innerHTML='<div class=placeholder-img>+</div>';">`;
      else img = '<div class="placeholder-img">+</div>';
      g += `<div class="product-card"><div class="favorite-btn ${fav ? 'active' : ''}" data-name="${p.nome}">${fav ? '♥' : '♡'}</div><div class="product-image">${img}</div><div class="product-info"><div class="product-name" data-name="${p.nome}">${p.nome}</div><div class="product-price">R$ ${price}</div><button class="buy-button" data-name="${p.nome}">Comprar</button></div></div>`;
    });
    return g + '</div>';
  }

  function renderProductPage(pname) {
    const prod = loadAllProducts().find(p => p.nome === decodeURIComponent(pname));
    if (!prod) return navigateTo('home');
    selectedProduct = prod; selectedSize = ''; cepValido = false;
    const cat = getCategory(prod), sizes = getSizeOptions(cat, prod);
    const imagens = prod.imagens || (prod.imagemBase64 ? [prod.imagemBase64] : []) || (prod.imagemUrl ? [prod.imagemUrl] : []);
    let carouselHtml = '';
    if (imagens.length === 0) { carouselHtml = '<div class="placeholder-img" style="height:400px;">+</div>'; }
    else if (imagens.length === 1) { carouselHtml = `<img src="${imagens[0]}" style="max-width:100%; max-height:450px; object-fit:contain;">`; }
    else {
      carouselHtml = `<div style="position:relative; width:100%;"><div style="display:flex; overflow-x:auto; scroll-snap-type:x mandatory; scroll-behavior:smooth;" id="carouselImages">${imagens.map(img => `<div style="min-width:100%; scroll-snap-align:start; display:flex; justify-content:center;"><img src="${img}" style="max-width:100%; max-height:450px; object-fit:contain;"></div>`).join('')}</div><div style="text-align:center; margin-top:12px;">${imagens.map((_, i) => `<span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#ccc; margin:0 5px; cursor:pointer;" onclick="document.getElementById('carouselImages').scrollTo({left: document.getElementById('carouselImages').clientWidth*${i}, behavior:'smooth'})"></span>`).join('')}</div></div>`;
    }
    const precoFormatado = prod.preco.toLocaleString('pt-BR', {minimumFractionDigits:2});
    const precoPix = (prod.preco * 0.9).toLocaleString('pt-BR', {minimumFractionDigits:2});
    const parcela = (prod.preco / 10).toLocaleString('pt-BR', {minimumFractionDigits:2});
    let opcoesHtml = '';
    if (sizes.length) opcoesHtml += `<div style="margin:24px 0;"><label style="font-weight:500; display:block; margin-bottom:8px;">Tamanho</label><div class="size-selector" id="sizeSelector">${sizes.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('')}</div></div>`;
    if (prod.cores?.length) { opcoesHtml += `<div style="margin:24px 0;"><label style="font-weight:500; display:block; margin-bottom:8px;">Cor</label><div class="size-selector" id="colorSelector">${prod.cores.map((c, i) => `<button class="size-btn${i===0 ? ' selected' : ''}" data-color="${c}">${c}</button>`).join('')}</div></div>`; selectedProduct.selectedColor = prod.cores[0]; }
    document.getElementById('appContent').innerHTML = `<a href="#/products" style="color:#999; display:block; margin-bottom:16px;">← Voltar</a><div class="product-page-container"><div class="product-images">${carouselHtml}</div><div class="product-details"><h1>${prod.nome}</h1><p style="color:#666; margin-bottom:16px;">${prod.desc || 'Produto especial MimoBox.'}</p><div class="price">R$ ${precoFormatado}</div><div class="installments">ou 10x de R$ ${parcela} sem juros</div><div class="pix-discount">PIX: R$ ${precoPix}</div>${opcoesHtml}<div class="frete-label">Calcular frete</div><div class="cep-group"><input type="text" id="cepInput" placeholder="Digite seu CEP" maxlength="9"><button id="calcFreteBtn" class="btn" style="width:auto;">OK</button></div><div id="freteOptions"></div><button id="addToCartBtn" class="add-to-cart-btn">Adicionar ao carrinho</button><button id="buyNowBtn" class="buy-now-btn">Comprar agora</button><p class="error" id="errorMsg"></p></div></div><div class="related-section"><h3 style="font-size:18px; font-weight:500; margin-bottom:16px;">Você também pode gostar</h3><div class="related-grid">${loadAllProducts().filter(p => p.nome !== prod.nome).sort(() => 0.5 - Math.random()).slice(0, 4).map(r => { const p = r.preco.toLocaleString('pt-BR', {minimumFractionDigits:2}); let img = '<div class="placeholder-img" style="height:120px;">+</div>'; if (r.imagens?.[0]) img = `<img src="${r.imagens[0]}" style="height:120px;">`; else if (r.imagemBase64) img = `<img src="${r.imagemBase64}" style="height:120px;">`; else if (r.imagemUrl) img = `<img src="${r.imagemUrl}" style="height:120px;">`; return `<div class="product-card" onclick="navigateTo('product','${r.nome}')"><div class="product-image">${img}</div><div class="product-info"><div class="product-name">${r.nome}</div><div class="product-price">R$ ${p}</div></div></div>`; }).join('')}</div></div>`;
    if (sizes.length) document.querySelectorAll('#sizeSelector .size-btn').forEach(b => b.addEventListener('click', function() { document.querySelectorAll('#sizeSelector .size-btn').forEach(x => x.classList.remove('selected')); this.classList.add('selected'); selectedSize = this.dataset.size; }));
    if (prod.cores?.length) document.querySelectorAll('#colorSelector .size-btn').forEach(b => b.addEventListener('click', function() { document.querySelectorAll('#colorSelector .size-btn').forEach(x => x.classList.remove('selected')); this.classList.add('selected'); selectedProduct.selectedColor = this.dataset.color; }));
  }

  function renderCart() {
    let html = `<h2 class="section-title">Carrinho</h2>`;
    if (!cart.length) html += '<p>Carrinho vazio.</p>';
    else {
      html += '<div style="max-width:800px;">';
      cart.forEach((item, i) => {
        const imgSrc = getItemImage(item);
        const imgTag = imgSrc ? `<img src="${imgSrc}" onerror="this.parentNode.innerHTML='+';">` : '+';
        html += `<div class="cart-item"><div class="cart-item-info"><div class="cart-item-img">${imgTag}</div><div><strong>${item.nome}</strong><br><small>Tamanho: ${item.size}${item.color ? ' | Cor: ' + item.color : ''}</small></div></div><span>R$ ${item.preco.toFixed(2)} <button class="remove-item" data-index="${i}">×</button></span></div>`;
      });
      const sub = cart.reduce((s, i) => s + i.preco, 0), frete = getFreteValue(), total = sub + frete, pix = total * 0.9;
      html += `<div style="margin-top:24px;padding:24px;background:#fff;border:1px solid #eee;"><div>Produtos: R$ ${sub.toFixed(2)}</div><div style="margin:16px 0;"><label>Frete</label><div class="frete-option-item ${selectedFreteType === 'economico' ? 'selected' : ''}" data-frete="economico"><input type="radio" name="cartFrete" ${selectedFreteType === 'economico' ? 'checked' : ''}> Econômico — R$ ${FRETE_ECONOMICO.toFixed(2)} (4-7 dias)</div><div class="frete-option-item ${selectedFreteType === 'express' ? 'selected' : ''}" data-frete="express"><input type="radio" name="cartFrete" ${selectedFreteType === 'express' ? 'checked' : ''}> Express — R$ ${FRETE_EXPRESS.toFixed(2)} (2-3 dias)</div></div><hr><div style="font-size:18px;">Total: R$ ${total.toFixed(2)}</div><div style="background:#f9f9f9;padding:14px;margin-top:12px;"><span style="color:#27ae60;">PIX: R$ ${pix.toFixed(2)}</span> <small>(10% OFF)</small></div><div style="background:#f9f9f9;padding:14px;">Cartão: 10x de R$ ${(total/10).toFixed(2)} sem juros</div></div><button id="proceedCheckoutBtn" class="btn" style="margin-top:20px;">Finalizar compra</button></div>`;
    }
    document.getElementById('appContent').innerHTML = html;
    document.querySelectorAll('.frete-option-item').forEach(el => el.addEventListener('click', function() { selectedFreteType = this.dataset.frete; renderCart(); }));
  }

  function renderCheckout() {
    if (!cart.length) return navigateTo('cart');
    const sub = cart.reduce((s, i) => s + i.preco, 0), frete = getFreteValue();
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') couponDiscount = sub * (appliedCoupon.value / 100);
      else if (appliedCoupon.type === 'fixed') couponDiscount = appliedCoupon.value;
      else if (appliedCoupon.type === 'frete') couponDiscount = frete;
    } else couponDiscount = 0;
    const total = sub + frete - couponDiscount, pix = total * 0.9;
    const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
    const addr = currentUser?.address || {};
    document.getElementById('appContent').innerHTML = `
    <div class="checkout-wrapper">
      <div class="checkout-header"><h2>Finalizar Pedido</h2><div class="secure-badge">🔒 Checkout seguro · Seus dados estão protegidos</div></div>
      <div class="checkout-progress"><div class="step active"><span class="step-num">1</span> Identificação</div><div class="step-divider"></div><div class="step active"><span class="step-num">2</span> Endereço</div><div class="step-divider"></div><div class="step active"><span class="step-num">3</span> Pagamento</div></div>
      <div class="checkout-columns">
        <div class="checkout-main">
          <div class="checkout-card"><h3><span class="icon">👤</span> Identificação</h3><div class="form-group"><label>Nome completo*</label><input type="text" id="nome" placeholder="Seu nome completo" value="${currentUser?.nome||''}"></div><div class="form-row"><div class="form-group"><label>E-mail*</label><input type="email" id="email" placeholder="seu@email.com" value="${currentUser?.email||''}"></div><div class="form-group"><label>Telefone</label><input type="tel" id="telefone" placeholder="(11) 99999-9999"></div></div></div>
          <div class="checkout-card"><h3><span class="icon">📍</span> Endereço de Entrega</h3><div class="form-row"><div class="form-group" style="flex:2;"><label>CEP*</label><input type="text" id="checkoutCep" placeholder="00000-000" maxlength="9" value="${addr.cep||''}"></div><div class="form-group" style="flex:1; display:flex; align-items:flex-end;"><button class="btn" style="width:auto; padding:12px 20px; font-size:13px;" id="buscarCepBtn">Buscar CEP</button></div></div><div class="form-row"><div class="form-group" style="flex:2;"><label>Rua*</label><input type="text" id="rua" placeholder="Nome da rua" value="${addr.rua||''}"></div><div class="form-group" style="flex:1; max-width:130px;"><label>Número*</label><input type="text" id="numero" placeholder="Nº" value="${addr.numero||''}"></div></div><div class="form-group"><label>Complemento</label><input type="text" id="complemento" placeholder="Apto, bloco, etc."></div><div class="form-row"><div class="form-group"><label>Bairro*</label><input type="text" id="bairro" placeholder="Bairro" value="${addr.bairro||''}"></div><div class="form-group" style="flex:2;"><label>Cidade*</label><input type="text" id="cidade" placeholder="Cidade" value="${addr.cidade||''}"></div><div class="form-group" style="max-width:100px;"><label>Estado*</label><select id="estado">${estados.map(uf => `<option ${(addr.estado||'SP')===uf?'selected':''}>${uf}</option>`).join('')}</select></div></div></div>
          <div class="checkout-card"><h3><span class="icon">🚚</span> Opções de Frete</h3><div style="display:flex; gap:8px; margin-bottom:16px;"><input type="text" id="cepFreteInput" placeholder="Digite seu CEP" maxlength="9" style="flex:1; padding:12px; border:1px solid #e0e0e0; border-radius:6px; font-size:13px;"><button id="calcFreteCheckoutBtn" class="btn" style="width:auto; padding:12px 24px;">Calcular</button></div><div id="checkoutFreteOptions"><div class="frete-option-item ${selectedFreteType==='economico'?'selected':''}" data-frete="economico" style="cursor:pointer;"><input type="radio" name="checkoutFrete" ${selectedFreteType==='economico'?'checked':''}> <strong>Econômico</strong> — R$ ${FRETE_ECONOMICO.toFixed(2)} <span style="color:#888; font-size:12px;">(4-7 dias úteis)</span></div><div class="frete-option-item ${selectedFreteType==='express'?'selected':''}" data-frete="express" style="cursor:pointer;"><input type="radio" name="checkoutFrete" ${selectedFreteType==='express'?'checked':''}> <strong>Express</strong> — R$ ${FRETE_EXPRESS.toFixed(2)} <span style="color:#888; font-size:12px;">(2-3 dias úteis)</span></div></div></div>
          <div class="checkout-card"><h3><span class="icon">💳</span> Forma de Pagamento</h3><div class="payment-options"><label class="payment-option selected" id="pixOption"><input type="radio" name="paymentMethod" value="pix" checked><span class="payment-icon">🔷</span><div class="payment-info"><strong>PIX</strong><span>Aprovação instantânea</span></div><span class="payment-tag">10% OFF</span></label><label class="payment-option" id="cartaoOption"><input type="radio" name="paymentMethod" value="cartao"><span class="payment-icon">💳</span><div class="payment-info"><strong>Cartão de Crédito</strong><span>Até 10x sem juros</span></div></label></div><div id="parcelasContainer" style="display:none; margin-top:12px;"><label style="font-size:12px; font-weight:500; color:#666;">Parcelas</label><select class="parcels-select" id="parcelas">${Array.from({length:10}, (_, i) => `<option value="${i+1}" ${i===9?'selected':''}>${i+1}x de R$ ${(total/(i+1)).toFixed(2)}${i===0?' à vista':''}</option>`).join('')}</select></div></div>
        </div>
        <div class="checkout-sidebar">
          <div class="checkout-card" style="position:sticky; top:100px;"><h3>🛒 Resumo do Pedido</h3>${cart.map(item => { const imgSrc = getItemImage(item); const imgTag = imgSrc ? `<img src="${imgSrc}" onerror="this.style.display='none'">` : '<span style="font-size:20px;">📦</span>'; return `<div class="summary-item"><div class="summary-item-img">${imgTag}</div><div class="summary-item-info"><strong>${item.nome}</strong><span>Tam: ${item.size||'Único'}${item.color?' | '+item.color:''}</span></div><div class="summary-item-price">R$ ${item.preco.toFixed(2)}</div></div>`; }).join('')}<div class="summary-totals"><div class="line"><span>Subtotal</span><span>R$ ${sub.toFixed(2)}</span></div><div class="line"><span>Frete</span><span>R$ ${frete.toFixed(2)}</span></div>${appliedCoupon?`<div class="line discount"><span>Cupom (${appliedCoupon.code})</span><span>-R$ ${couponDiscount.toFixed(2)}</span></div>`:''}<div class="line total"><span>Total</span><span id="checkoutTotal">R$ ${total.toFixed(2)}</span></div><div style="font-size:13px; color:#27ae60; margin-top:4px; font-weight:500;">💚 No PIX: R$ ${pix.toFixed(2)}</div></div><div style="margin-top:16px; padding-top:12px; border-top:1px solid #eee;"><label style="font-size:12px; font-weight:500; color:#666;">Cupom de desconto</label><div class="coupon-row"><input type="text" id="couponInput" placeholder="Digite o código"><button id="applyCouponBtn">Aplicar</button></div><div id="couponMessage" style="margin-top:6px;"></div></div><button id="confirmOrderBtn" class="confirm-btn">✅ FINALIZAR PEDIDO</button><p class="error" id="checkoutError"></p><div class="trust-badges"><span>🔒 SSL Seguro</span><span>📦 Frete Rastreável</span><span>🔄 Devolução Grátis</span></div></div>
        </div>
      </div>
    </div>`;
    const pixOpt = document.getElementById('pixOption');
    const cartaoOpt = document.getElementById('cartaoOption');
    const parcelasContainer = document.getElementById('parcelasContainer');
    function updatePaymentSelection(selected) {
      [pixOpt, cartaoOpt].forEach(el => el.classList.remove('selected'));
      if (selected === 'pix') { pixOpt.classList.add('selected'); pixOpt.querySelector('input').checked = true; parcelasContainer.style.display = 'none'; }
      else { cartaoOpt.classList.add('selected'); cartaoOpt.querySelector('input').checked = true; parcelasContainer.style.display = 'block'; }
    }
    pixOpt.addEventListener('click', () => updatePaymentSelection('pix'));
    cartaoOpt.addEventListener('click', () => updatePaymentSelection('cartao'));
    document.querySelectorAll('#checkoutFreteOptions .frete-option-item').forEach(el => { el.addEventListener('click', function() { document.querySelectorAll('#checkoutFreteOptions .frete-option-item').forEach(x => x.classList.remove('selected')); this.classList.add('selected'); this.querySelector('input').checked = true; selectedFreteType = this.dataset.frete; renderCheckout(); }); });
  }

  function renderThanksPage(orderNumber) {
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Pedido #${orderNumber} – MimoBox`;
    document.getElementById('appContent').innerHTML = `
      <div class="thanks-container">
        <h2>🎉 Pedido #${orderNumber} Realizado!</h2>
        <p>Obrigado! Caso o pagamento não tenha sido processado, utilize os dados abaixo.</p>
        <div style="background:#f0f9f4; padding:20px; border-radius:8px; margin:20px 0;">
          <p><strong>Chave PIX:</strong> ${PIX_KEY}</p>
          <button onclick="navigator.clipboard.writeText('${PIX_KEY}');alert('Chave copiada!')">📋 Copiar</button>
        </div>
        <a class="whatsapp-btn" href="${whatsappLink}" target="_blank" style="display:inline-block; background:#25D366; color:#fff; padding:14px 28px; border-radius:8px; text-decoration:none; font-weight:600; margin-top:20px;">💬 Enviar comprovante no WhatsApp</a>
        <p style="margin-top:20px;"><a href="#/">← Voltar para loja</a></p>
      </div>`;
  }

  // ==================== ADMIN ====================
  function renderAdmin() {
    if (!currentUser) { document.getElementById('appContent').innerHTML = `<div style="text-align:center;padding:80px 20px;"><h2 style="color:#c0392b;">Acesso Restrito</h2><p>Faça login.</p><button class="btn" style="max-width:200px;margin-top:20px;" onclick="navigateTo('login')">Fazer Login</button></div>`; return; }
    if (currentUser.email !== ADMIN_EMAIL) { document.getElementById('appContent').innerHTML = `<div style="text-align:center;padding:80px 20px;"><h2 style="color:#c0392b;">Acesso Negado</h2></div>`; return; }
    if (AUTHORIZED_IP !== 'SEU_IP_AQUI') {
      document.getElementById('appContent').innerHTML = '<div style="text-align:center;padding:60px;">Verificando identidade...</div>';
      fetch('https://api.ipify.org?format=json').then(r => r.json()).then(data => {
        if (data.ip !== AUTHORIZED_IP) { document.getElementById('appContent').innerHTML = `<div style="text-align:center;padding:80px 20px;"><h2 style="color:#c0392b;">Acesso Bloqueado</h2></div>`; return; }
        loadAdminPanel();
      }).catch(() => { document.getElementById('appContent').innerHTML = `<div style="text-align:center;padding:80px 20px;"><h2 style="color:#c0392b;">Erro</h2></div>`; });
    } else { loadAdminPanel(); }
  }

  function loadAdminPanel() {
    document.getElementById('appContent').innerHTML = `<div class="admin-container"><h2>Painel Administrativo</h2><div style="display:flex;gap:8px;margin-bottom:24px;"><button class="btn" onclick="renderAdminTab('products')">📦 Produtos</button><button class="btn btn-outline" onclick="renderAdminTab('stats')">📊 Estatísticas</button><button class="btn btn-outline" onclick="renderAdminTab('security')">🔒 Segurança</button></div><div id="adminTabContent"></div></div>`;
    renderAdminTab('products');
  }

  window.renderAdminTab = function(tab) {
    if (tab === 'security') {
      const attempts = JSON.parse(localStorage.getItem('_adminLog') || '[]');
      document.getElementById('adminTabContent').innerHTML = `<div style="background:#fff;padding:24px;border:1px solid #eee;border-radius:4px;"><h3>🔒 Registro de Acessos</h3>${attempts.length===0?'<p>Nenhum registro.</p>':attempts.reverse().map(a=>`<div style="background:#f9f9f9;padding:8px 12px;margin-bottom:4px;border-radius:4px;font-size:12px;"><strong>${a.user}</strong> · ${new Date(a.date).toLocaleString('pt-BR')}</div>`).join('')}<button class="admin-btn" style="background:#c0392b;color:#fff;margin-top:16px;" onclick="if(confirm('Limpar?')){localStorage.removeItem('_adminLog');renderAdminTab('security');}">Limpar</button></div>`;
    } else if (tab === 'stats') {
      const visits = parseInt(localStorage.getItem('mimoVisitorCount'))||0;
      const orders = JSON.parse(localStorage.getItem('mimoOrderHistory'))||[];
      const revenue = orders.reduce((s,o)=>s+(o.total||0),0);
      document.getElementById('adminTabContent').innerHTML = `<div style="background:#fff;padding:24px;"><h3>📊 Estatísticas</h3><p>Visitas: ${visits} | Pedidos: ${orders.length} | Faturamento: R$ ${revenue.toFixed(2)}</p></div>`;
    } else {
      const all = loadAllProducts();
      const custom = JSON.parse(localStorage.getItem('mimoCustomProducts'))||[];
      document.getElementById('adminTabContent').innerHTML = `<div class="admin-form"><h3 id="formTitle">Novo produto</h3><input type="text" id="adminNome" placeholder="Nome*"><input type="number" id="adminPreco" placeholder="Preço*" step="0.01"><textarea id="adminDesc" placeholder="Descrição"></textarea><input type="file" id="adminImagemFile" accept="image/*" multiple><input type="text" id="adminCores" placeholder="Cores"><input type="text" id="adminTamanhos" placeholder="Tamanhos"><select id="adminCategoria"><option value="pelucia">Pelúcia</option><option value="chinelo">Chinelo</option><option value="box">Box</option><option value="pantufa">Pantufa</option><option value="pijama">Pijama</option><option value="outros">Outros</option></select><button class="admin-btn save" onclick="saveProduct()">💾 Salvar</button><button class="admin-btn" style="background:#f5f5f5;display:none;" onclick="cancelEdit()" id="cancelBtn">Cancelar</button></div><button class="admin-btn" style="background:#f44336;color:#fff;margin-bottom:16px;width:auto;" onclick="resetProducts()">🔄 Restaurar produtos originais</button><table class="admin-table"><thead><tr><th>Img</th><th>Nome</th><th>Preço</th><th>Tipo</th><th>Ações</th></tr></thead><tbody>${all.map(p=>`<tr><td>${p.imagens?.[0]?`<img src="${p.imagens[0]}" width="40">`:'+'}</td><td>${p.nome}</td><td>R$ ${p.preco.toFixed(2)}</td><td style="font-size:11px;">${custom.some(c=>c.nome===p.nome)?'Customizado':'Original'}</td><td><button class="admin-btn edit edit-product-btn" data-name="${p.nome.replace(/"/g,'&quot;')}">✏️</button> <button class="admin-btn delete delete-product-btn" data-name="${p.nome.replace(/"/g,'&quot;')}">🗑️</button></td></tr>`).join('')}</tbody></table>`;
    }
  };

  window.saveProduct = async function() {
    const nome = document.getElementById('adminNome').value.trim();
    const preco = parseFloat(document.getElementById('adminPreco').value);
    const desc = document.getElementById('adminDesc').value.trim();
    const categoria = document.getElementById('adminCategoria').value;
    const cores = document.getElementById('adminCores').value.split(',').map(c=>c.trim()).filter(c=>c);
    const tamanhos = document.getElementById('adminTamanhos').value.split(',').map(t=>t.trim()).filter(t=>t);
    const originalName = document.getElementById('adminNome').dataset.originalName;
    const files = document.getElementById('adminImagemFile').files;
    if (!nome||isNaN(preco)||preco<=0) return showToast('Preencha nome e preço','warning');
    let imagens = [];
    for (const f of files) { if (f.size>2*1024*1024) return showToast(`"${f.name}" muito grande!`,'warning'); imagens.push(await new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(f); })); }
    const custom = JSON.parse(localStorage.getItem('mimoCustomProducts'))||[];
    const produto = { nome, preco, desc, categoria };
    if (imagens.length===1) produto.imagemBase64 = imagens[0]; else if (imagens.length>1) produto.imagens = imagens;
    if (cores.length) produto.cores = cores;
    if (tamanhos.length) produto.tamanhos = tamanhos;
    if (originalName) {
      const filtered = custom.filter(c=>c.nome!==originalName);
      if (!imagens.length) { const old = custom.find(c=>c.nome===originalName)||productsData.find(p=>p.nome===originalName); if (old?.imagens) produto.imagens = old.imagens; else if (old?.imagemBase64) produto.imagemBase64 = old.imagemBase64; }
      filtered.push(produto); localStorage.setItem('mimoCustomProducts',JSON.stringify(filtered));
      const isNative = productsData.some(p=>p.nome===originalName);
      if (isNative&&nome!==originalName) { const hidden = JSON.parse(localStorage.getItem('mimoHiddenProducts'))||[]; if (!hidden.includes(originalName)) { hidden.push(originalName); localStorage.setItem('mimoHiddenProducts',JSON.stringify(hidden)); } }
      showToast('Atualizado!','success');
    } else {
      if (productsData.some(p=>p.nome===nome)||custom.some(c=>c.nome===nome)) return showToast('Nome já existe!','warning');
      custom.push(produto); localStorage.setItem('mimoCustomProducts',JSON.stringify(custom)); showToast('Adicionado!','success');
    }
    ['adminNome','adminPreco','adminDesc','adminCores','adminTamanhos'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('adminImagemFile').value=''; document.getElementById('cancelBtn').style.display='none';
    document.getElementById('formTitle').textContent='Novo produto'; delete document.getElementById('adminNome').dataset.originalName;
    renderAdminTab('products');
  };

  window.editProduct = function(name) {
    const custom = JSON.parse(localStorage.getItem('mimoCustomProducts'))||[];
    let prod = custom.find(c=>c.nome===name) || productsData.find(p=>p.nome===name);
    if (!prod) return;
    document.getElementById('adminNome').value = prod.nome; document.getElementById('adminPreco').value = prod.preco;
    document.getElementById('adminDesc').value = prod.desc||''; document.getElementById('adminCores').value = (prod.cores||[]).join(', ');
    document.getElementById('adminTamanhos').value = (prod.tamanhos||[]).join(', '); document.getElementById('adminCategoria').value = prod.categoria||'outros';
    document.getElementById('adminImagemFile').value = ''; document.getElementById('adminNome').dataset.originalName = name;
    document.getElementById('formTitle').textContent = 'Editar produto'; document.getElementById('cancelBtn').style.display = 'block';
    window.scrollTo({top:0,behavior:'smooth'});
  };

  window.deleteProduct = function(name) {
    if (!confirm(`Remover "${name}"?`)) return;
    const isNative = productsData.some(p=>p.nome===name);
    if (isNative) { const hidden = JSON.parse(localStorage.getItem('mimoHiddenProducts'))||[]; if (!hidden.includes(name)) { hidden.push(name); localStorage.setItem('mimoHiddenProducts',JSON.stringify(hidden)); } const custom = JSON.parse(localStorage.getItem('mimoCustomProducts'))||[]; localStorage.setItem('mimoCustomProducts',JSON.stringify(custom.filter(c=>c.nome!==name))); }
    else { const custom = JSON.parse(localStorage.getItem('mimoCustomProducts'))||[]; localStorage.setItem('mimoCustomProducts',JSON.stringify(custom.filter(c=>c.nome!==name))); }
    showToast('Removido!','info'); renderAdminTab('products');
  };

  window.cancelEdit = function() { delete document.getElementById('adminNome').dataset.originalName; document.getElementById('formTitle').textContent='Novo produto'; document.getElementById('cancelBtn').style.display='none'; ['adminNome','adminPreco','adminDesc','adminCores','adminTamanhos'].forEach(id=>document.getElementById(id).value=''); };
  window.resetProducts = function() { if (confirm('Restaurar todos os produtos originais?')) { localStorage.removeItem('mimoHiddenProducts'); localStorage.removeItem('mimoCustomProducts'); location.reload(); } };

  // ==================== EVENTOS ====================
  document.addEventListener('click', async e => {
    if (e.target.classList.contains('favorite-btn')) { const name = e.target.dataset.name; favorites.includes(name) ? favorites = favorites.filter(f=>f!==name) : favorites.push(name); localStorage.setItem('mimoFavorites',JSON.stringify(favorites)); router(); return; }
    if (e.target.classList.contains('product-name')||e.target.classList.contains('buy-button')) { navigateTo('product', e.target.dataset.name); return; }
    if (e.target.classList.contains('size-btn')&&!e.target.closest('#colorSelector')) { document.querySelectorAll('#sizeSelector .size-btn').forEach(b=>b.classList.remove('selected')); e.target.classList.add('selected'); selectedSize = e.target.dataset.size; }
    if (e.target.id==='calcFreteBtn') {
      const cep = document.getElementById('cepInput').value.replace(/\D/g,'');
      if (cep.length!==8) return document.getElementById('errorMsg').textContent='CEP inválido';
      cepValido=true; document.getElementById('errorMsg').textContent='';
      document.getElementById('freteOptions').innerHTML = `<div class="frete-option-item ${selectedFreteType==='economico'?'selected':''}" data-frete="economico"><input type="radio" name="prodFrete" ${selectedFreteType==='economico'?'checked':''}> Econômico — R$ ${FRETE_ECONOMICO.toFixed(2)} (4-7 dias)</div><div class="frete-option-item ${selectedFreteType==='express'?'selected':''}" data-frete="express"><input type="radio" name="prodFrete" ${selectedFreteType==='express'?'checked':''}> Express — R$ ${FRETE_EXPRESS.toFixed(2)} (2-3 dias)</div>`;
      document.querySelectorAll('#freteOptions .frete-option-item').forEach(el=>el.addEventListener('click',function(){ selectedFreteType=this.dataset.frete; document.querySelectorAll('#freteOptions .frete-option-item').forEach(x=>x.classList.remove('selected')); this.classList.add('selected'); }));
    }
    if (e.target.id==='calcFreteCheckoutBtn') { document.getElementById('checkoutError').textContent=''; showToast('Frete calculado!','success'); }
    if (e.target.id==='buscarCepBtn') {
      const cep = document.getElementById('checkoutCep').value.replace(/\D/g,'');
      if (cep.length===8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(r=>r.json()).then(d=>{
          if (!d.erro) { document.getElementById('rua').value = d.logradouro||''; document.getElementById('bairro').value = d.bairro||''; document.getElementById('cidade').value = d.localidade||''; document.getElementById('estado').value = d.uf||'SP'; showToast('CEP encontrado!','success'); }
          else showToast('CEP não encontrado','warning');
        }).catch(()=>showToast('Erro ao buscar CEP','warning'));
      } else showToast('Digite um CEP válido','warning');
    }
    if (e.target.id==='addToCartBtn') { if (!selectedProduct) return; const sizes = getSizeOptions(getCategory(selectedProduct), selectedProduct); if (sizes.length && !selectedSize) return document.getElementById('errorMsg').textContent='Selecione um tamanho'; cart.push({ nome:selectedProduct.nome, preco:selectedProduct.preco, size:selectedSize||'Único', color:selectedProduct.selectedColor||'' }); saveCart(); showToast('Adicionado ao carrinho!','success'); }
    if (e.target.id==='buyNowBtn') { if (!selectedProduct) return; const sizes = getSizeOptions(getCategory(selectedProduct), selectedProduct); if (sizes.length && !selectedSize) return document.getElementById('errorMsg').textContent='Selecione um tamanho'; if (!cepValido) return document.getElementById('errorMsg').textContent='Calcule o frete'; cart = [{ nome:selectedProduct.nome, preco:selectedProduct.preco, size:selectedSize||'Único', color:selectedProduct.selectedColor||'' }]; saveCart(); navigateTo('checkout'); }
    if (e.target.classList.contains('remove-item')) { cart.splice(e.target.dataset.index,1); saveCart(); router(); }
    if (e.target.id==='proceedCheckoutBtn'&&cart.length) navigateTo('checkout');
    if (e.target.id==='applyCouponBtn') {
      const code = document.getElementById('couponInput').value.trim().toUpperCase();
      const msg = document.getElementById('couponMessage');
      if (!code) return msg.innerHTML='<span style="color:#c0392b;">Digite um cupom.</span>';
      const c = COUPONS.find(x=>x.code===code);
      if (!c) { msg.innerHTML='<span style="color:#c0392b;">Cupom inválido.</span>'; appliedCoupon=null; couponDiscount=0; }
      else if (c.minTotal&&cart.reduce((s,i)=>s+i.preco,0)<c.minTotal) { msg.innerHTML=`<span style="color:#c0392b;">Pedido mínimo: R$ ${c.minTotal.toFixed(2)}</span>`; appliedCoupon=null; couponDiscount=0; }
      else { appliedCoupon=c; msg.innerHTML='<span style="color:#27ae60;">Cupom aplicado!</span>'; }
      renderCheckout();
    }
    if (e.target.id==='confirmOrderBtn') {
      const nome = document.getElementById('nome')?.value.trim();
      const rua = document.getElementById('rua')?.value.trim();
      const num = document.getElementById('numero')?.value.trim();
      const bairro = document.getElementById('bairro')?.value.trim();
      const cidade = document.getElementById('cidade')?.value.trim();
      const estado = document.getElementById('estado')?.value;
      const cep = document.getElementById('checkoutCep')?.value.replace(/\D/g,'');
      const method = document.querySelector('input[name="paymentMethod"]:checked')?.value||'pix';
      const parcelas = document.getElementById('parcelas')?.value||'1';
      if (!nome||!rua||!num||!bairro||!cidade||!cep) return document.getElementById('checkoutError').textContent='Preencha todos os campos obrigatórios.';
      if (cep.length!==8) return document.getElementById('checkoutError').textContent='CEP inválido.';
      const sub = cart.reduce((s,i)=>s+i.preco,0), frete = getFreteValue();
      if (appliedCoupon) { if (appliedCoupon.type==='percent') couponDiscount = sub*(appliedCoupon.value/100); else if (appliedCoupon.type==='fixed') couponDiscount = appliedCoupon.value; else if (appliedCoupon.type==='frete') couponDiscount = frete; }
      const total = sub+frete-couponDiscount;
      const final = method==='pix'?total*0.9:total;
      const desc = method==='pix'?'PIX (10% OFF)':`Cartão ${parcelas}x`;
      const orderNumber = (parseInt(localStorage.getItem('mimoLastOrderNumber'))||533)+1;
      localStorage.setItem('mimoLastOrderNumber',orderNumber);
      const order = { items:cart, subtotal:sub, frete, total:final, paymentMethod:desc, address:{nome,rua,numero:num,bairro,cidade,estado,cep}, orderNumber, date:new Date().toISOString() };
      const history = JSON.parse(localStorage.getItem('mimoOrderHistory'))||[];
      history.unshift(order); localStorage.setItem('mimoOrderHistory',JSON.stringify(history));
      if (currentUser) { currentUser.address = order.address; localStorage.setItem('mimoUser',JSON.stringify(currentUser)); }
      try {
        const response = await fetch(PAYMENT_WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: final, description: `Pedido #${orderNumber} - MimoBox`, orderNumber })
        });
        const data = await response.json();
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          document.getElementById('checkoutError').textContent = 'Falha ao gerar pagamento. Redirecionando...';
          setTimeout(() => navigateTo('thanks', orderNumber), 3000);
        }
      } catch (err) {
        document.getElementById('checkoutError').textContent = 'Erro de conexão. Redirecionando...';
        setTimeout(() => navigateTo('thanks', orderNumber), 3000);
      }
    }
    if (e.target.id==='loginBtn') { const email = document.getElementById('loginEmail').value.trim(); const pass = document.getElementById('loginPassword').value; const user = usersDB.find(u=>u.email===email); if (!user) return document.getElementById('globalError').classList.add('show'), document.getElementById('globalError').textContent='Email não cadastrado'; if (user.password!==pass) return document.getElementById('globalError').classList.add('show'), document.getElementById('globalError').textContent='Senha incorreta'; currentUser = {email:user.email, nome:user.nome, address:user.address||{}}; localStorage.setItem('mimoUser',JSON.stringify(currentUser)); updateAuthUI(); navigateTo('home'); }
    if (e.target.id==='signupBtn') { const nome = document.getElementById('signupNome').value.trim(); const email = document.getElementById('signupEmail').value.trim(); const pass = document.getElementById('signupPassword').value; const confirm = document.getElementById('signupConfirm').value; if (!nome) return document.getElementById('signupError').textContent='Nome obrigatório'; if (!email.includes('@')) return document.getElementById('signupError').textContent='Email inválido'; if (pass.length<6) return document.getElementById('signupError').textContent='Mínimo 6 caracteres'; if (pass!==confirm) return document.getElementById('signupError').textContent='Senhas não coincidem'; if (usersDB.find(u=>u.email===email)) return document.getElementById('signupError').textContent='Email já cadastrado'; usersDB.push({email,password:pass,nome,address:{}}); localStorage.setItem('mimoUsers',JSON.stringify(usersDB)); currentUser = {email,nome,address:{}}; localStorage.setItem('mimoUser',JSON.stringify(currentUser)); updateAuthUI(); navigateTo('home'); showToast('Conta criada!','success'); }
    if (e.target.id==='saveAccountBtn') { const nome = document.getElementById('accountNome').value.trim(); if (!nome) return showToast('Nome obrigatório','warning'); currentUser.nome = nome; currentUser.address = { rua:document.getElementById('accountRua').value.trim(), numero:document.getElementById('accountNumero').value.trim(), bairro:document.getElementById('accountBairro').value.trim(), cidade:document.getElementById('accountCidade').value.trim(), estado:document.getElementById('accountEstado').value, cep:document.getElementById('accountCep').value.trim() }; localStorage.setItem('mimoUser',JSON.stringify(currentUser)); updateAuthUI(); showToast('Salvo!','success'); }
    if (e.target.classList.contains('edit-product-btn')) { editProduct(e.target.dataset.name); return; }
    if (e.target.classList.contains('delete-product-btn')) { deleteProduct(e.target.dataset.name); return; }
  });

  window.addEventListener('hashchange', router);
  function router() {
    const hashFull = window.location.hash.slice(1);
    const hash = hashFull.split('?')[0] || '/';
    const params = hashFull.includes('?') ? new URLSearchParams(hashFull.split('?')[1]) : null;
    if (hash==='/'||hash==='') renderHomePage();
    else if (hash==='/products') renderProductListing();
    else if (hash.startsWith('/product/')) renderProductPage(hash.split('/')[2]);
    else if (hash==='/cart') renderCart();
    else if (hash==='/favorites') renderFavorites();
    else if (hash==='/checkout') renderCheckout();
    else if (hash==='/thanks') { const orderNumber = params ? params.get('orderNumber') : null; if (orderNumber) renderThanksPage(orderNumber); else navigateTo('home'); }
    else if (hash==='/login') renderLogin();
    else if (hash==='/account') renderAccount();
    else if (hash==='/admin') renderAdmin();
  }
  function renderFavorites() { document.getElementById('appContent').innerHTML = `<h2 class="section-title">Favoritos</h2>${renderProductGrid(loadAllProducts().filter(p=>favorites.includes(p.nome)))}`; }
  function renderLogin() { document.getElementById('appContent').innerHTML = `<div class="auth-container"><div class="auth-tabs"><div class="auth-tab active" data-tab="login" onclick="switchAuthTab('login')">Entrar</div><div class="auth-tab" data-tab="signup" onclick="switchAuthTab('signup')">Criar conta</div></div><div class="global-error" id="globalError"></div><div id="loginForm" class="auth-form"><input id="loginEmail" placeholder="Email"><input type="password" id="loginPassword" placeholder="Senha"><button id="loginBtn" class="btn">Entrar</button></div><div id="signupForm" class="auth-form" style="display:none;"><input id="signupNome" placeholder="Nome"><input id="signupEmail" placeholder="Email"><input type="password" id="signupPassword" placeholder="Senha"><input type="password" id="signupConfirm" placeholder="Confirmar senha"><p class="error" id="signupError"></p><button id="signupBtn" class="btn">Criar conta</button></div></div>`; }
  function renderAccount() {
    if (!currentUser) return navigateTo('login');
    const addr = currentUser.address || {};
    const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
    document.getElementById('appContent').innerHTML = `<div class="account-container"><h2>Minha Conta</h2><div class="account-field"><label>Nome</label><input id="accountNome" value="${currentUser.nome}"></div><div class="account-field"><label>Email</label><input value="${currentUser.email}" disabled></div><h3>Endereço</h3><div class="account-field"><label>Rua</label><input id="accountRua" value="${addr.rua||''}"></div><div class="account-field"><label>Número</label><input id="accountNumero" value="${addr.numero||''}"></div><div class="account-field"><label>Bairro</label><input id="accountBairro" value="${addr.bairro||''}"></div><div class="account-field"><label>Cidade</label><input id="accountCidade" value="${addr.cidade||''}"></div><div class="account-field"><label>Estado</label><select id="accountEstado">${estados.map(uf=>`<option ${(addr.estado||'SP')===uf?'selected':''}>${uf}</option>`).join('')}</select></div><div class="account-field"><label>CEP</label><input id="accountCep" value="${addr.cep||''}"></div><button id="saveAccountBtn" class="btn">Salvar</button><h3>Meus pedidos</h3><div id="orderHistory"></div></div>`;
    const history = JSON.parse(localStorage.getItem('mimoOrderHistory'))||[];
    const mine = history.filter(o => o.address?.nome===currentUser.nome);
    document.getElementById('orderHistory').innerHTML = mine.length===0?'<p>Nenhum pedido.</p>':mine.map(o=>`<div style="background:#fff;padding:12px;border:1px solid #eee;margin-bottom:8px;"><strong>#${o.orderNumber}</strong> · ${new Date(o.date).toLocaleDateString('pt-BR')}<br>R$ ${o.total.toFixed(2)} · ${o.paymentMethod}<br><small>${o.items.map(i=>i.nome).join(', ')}</small></div>`).join('');
  }
  window.switchAuthTab = function(tab) { document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active')); document.querySelector(`[data-tab="${tab}"]`).classList.add('active'); document.getElementById('loginForm').style.display = tab==='login'?'block':'none'; document.getElementById('signupForm').style.display = tab==='signup'?'block':'none'; };

  document.getElementById('searchBtn').addEventListener('click', ()=>{ searchQuery=document.getElementById('searchInput').value.trim(); currentCategory='all'; navigateTo('products'); });
  document.getElementById('searchInput').addEventListener('keypress', e=>{ if(e.key=='Enter') document.getElementById('searchBtn').click(); });

  (function(){ const admin = usersDB.find(u=>u.email===ADMIN_EMAIL); if (admin) admin.password = ADMIN_PASSWORD; else usersDB.push({email: ADMIN_EMAIL, password: ADMIN_PASSWORD, nome:'Admin', address:{}}); localStorage.setItem('mimoUsers', JSON.stringify(usersDB)); })();

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', () => { updateCartCount(); updateAuthUI(); router(); }); }
  else { updateCartCount(); updateAuthUI(); router(); }
</script>
</body>
</html>
