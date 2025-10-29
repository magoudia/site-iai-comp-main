<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Corps JSON invalide']);
  exit;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Champs requis manquants']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Email invalide']);
  exit;
}

$to = 'magoudia203@gmail.com';
$from = 'onboarding@resend.dev';
$subjectLine = '[Formulaire de contact] ' . $subject;

$html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">'
  .'<h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Nouveau message du formulaire de contact</h2>'
  .'<div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">'
  .'<p><strong style="color: #007bff;">Nom:</strong> '.htmlspecialchars($name).'</p>'
  .'<p><strong style="color: #007bff;">Email:</strong> '.htmlspecialchars($email).'</p>'
  .($phone !== '' ? '<p><strong style="color: #007bff;">Téléphone:</strong> '.htmlspecialchars($phone).'</p>' : '')
  .'<p><strong style="color: #007bff;">Sujet:</strong> '.htmlspecialchars($subject).'</p>'
  .'</div>'
  .'<div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">'
  .'<h3 style="color: #333; margin-top: 0;">Message:</h3>'
  .'<p style="line-height: 1.6; color: #555;">'.nl2br(htmlspecialchars($message)).'</p>'
  .'</div>'
  .'<div style="margin-top: 20px; padding: 10px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #666;">'
  .'<p>Envoyé depuis le site web le '.date('d/m/Y H:i:s').'.</p>'
  .'</div>'
  .'</div>';

$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: IAI Compétences <'.$from.'>';
$headers[] = 'Reply-To: '. $name .' <'.$email.'>';
$headers[] = 'X-Mailer: PHP/'.phpversion();

$ok = @mail($to, $subjectLine, $html, implode("\r\n", $headers));

if ($ok) {
  echo json_encode(['success' => true, 'message' => 'Email envoyé']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'Échec de l\'envoi via mail()']);
}
?>
