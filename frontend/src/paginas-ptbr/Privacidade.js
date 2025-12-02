import React from 'react';
import BackButtonPTBR from '../componentes-ptbr/BackButtonPTBR';

class Privacidade extends React.Component {
    render() {
        return (
            <>
                <BackButtonPTBR />
                <main>
                    <div className="container-privacy">
                      <h1>Privacidade</h1>
              
                      <div className="text-privacy">
              
                        <div className="titulo-privacy">
                          <h2>Termo de Privacidade</h2>
                          <p>
                            Este Termo de Privacidade tem como objetivo esclarecer como coletamos, utilizamos,
                            armazenamos e protegemos os dados dos usuários do nosso site de avaliação de filmes e séries.
                            Ao utilizar nossos serviços, você concorda com as práticas descritas abaixo.
                          </p>
                        </div>
              
                        <div className="p-privacy">
                          <h3>1. Coleta de Informações</h3>
                          <p>Coletamos informações pessoais e não pessoais dos usuários, tais como:</p>
                          <ul className="lista-privacy">
                            <li className="li-privacy">
                              <p>• Dados cadastrais: nome, e-mail, nome de usuário e senha, quando o usuário cria uma conta.</p>
                            </li>
                            <li className="li-privacy">
                              <p>• Informações de uso: histórico de avaliações, comentários, curtidas, listas personalizadas e preferências.</p>
                            </li>
                            <li className="li-privacy">
                              <p>• Informações técnicas: endereço IP, tipo de navegador, dispositivo, sistema operacional e dados de acesso.</p>
                            </li>
                          </ul>
                        </div>
              
                        <div className="p-privacy">
                          <h3>2. Uso das Informações</h3>
                          <p>As informações coletadas são utilizadas para:</p>
                          <ul className="lista-privacy">
                            <li className="li-privacy"><p>• Permitir o funcionamento adequado do site e de suas funcionalidades;</p></li>
                            <li className="li-privacy"><p>• Personalizar a experiência do usuário, como recomendações de filmes e séries;</p></li>
                            <li className="li-privacy"><p>• Melhorar nossos serviços e conteúdo com base no comportamento dos usuários;</p></li>
                            <li className="li-privacy"><p>• Entrar em contato com o usuário, caso necessário (como atualizações de conta ou avisos importantes);</p></li>
                            <li className="li-privacy"><p>• Prevenir atividades fraudulentas ou uso indevido da plataforma.</p></li>
                          </ul>
                        </div>
              
                        <div className="p-privacy">
                          <h3>3. Compartilhamento de Dados</h3>
                          <p>
                            Não vendemos, trocamos ou alugamos dados pessoais dos usuários a terceiros. Podemos compartilhar informações nas seguintes situações:
                          </p>
                          <ul className="lista-privacy">
                            <li className="li-privacy"><p>• Com parceiros e prestadores de serviço que auxiliam na operação do site, sob acordo de confidencialidade;</p></li>
                            <li className="li-privacy"><p>• Quando exigido por lei, por ordem judicial ou autoridade competente;</p></li>
                            <li className="li-privacy"><p>• Para proteger direitos, propriedade e segurança do site, dos usuários ou do público.</p></li>
                          </ul>
                        </div>
              
                        <div className="p-privacy">
                          <h3>4. Armazenamento e Segurança</h3>
                          <p>
                            Adotamos medidas técnicas e administrativas para proteger os dados pessoais contra acessos não autorizados,
                            vazamentos ou qualquer forma de tratamento inadequado. <br /><br />
                            As informações são armazenadas em servidores seguros, podendo estar localizados no Brasil ou no exterior,
                            respeitando a legislação aplicável.
                          </p>
                        </div>
              
                        <div className="p-privacy">
                          <h3>5. Cookies e Tecnologias Semelhantes</h3>
                          <p>
                            Utilizamos cookies para melhorar a navegação, entender o comportamento dos usuários e oferecer conteúdos mais relevantes.
                            O usuário pode desativar os cookies nas configurações do navegador, embora isso possa impactar o funcionamento de algumas funcionalidades do site.
                          </p>
                        </div>
              
                        <div className="p-privacy">
                          <h3>6. Direitos do Usuário</h3>
                          <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), o usuário tem o direito de:</p>
                          <ul className="lista-privacy">
                            <li className="li-privacy"><p>• Acessar seus dados pessoais;</p></li>
                            <li className="li-privacy"><p>• Corrigir dados incorretos ou desatualizados;</p></li>
                            <li className="li-privacy"><p>• Solicitar a exclusão de seus dados;</p></li>
                            <li className="li-privacy"><p>• Revogar o consentimento para o uso dos dados, quando aplicável.</p></li>
                          </ul>
                        </div>
              
                        <div className="p-privacy">
                          <h3>7. Alterações neste Termo</h3>
                          <p>
                            Este Termo de Privacidade pode ser atualizado periodicamente. Recomendamos a leitura regular para estar sempre informado.
                            Mudanças relevantes serão comunicadas por meio do site ou por e-mail.
                          </p>
                        </div>
              
                        <div className="p-privacy">
                          <h3>8. Contato</h3>
                          <p>
                            Em caso de dúvidas, sugestões ou solicitações relacionadas à privacidade e proteção de dados, entre em contato conosco:
                          </p>
                          <ul className="lista-privacy">
                            <li className="li-privacy"><p>• E-mail: escola.pji2@gmail.com</p></li>
                            <li className="li-privacy"><p>• Responsável pelo tratamento de dados: 2º ano IFSP Caraguatatuba</p></li>
                          </ul>
                        </div>
              
                      </div>
                    </div>
                </main>
            </>
        );
    }
}

export default Privacidade;