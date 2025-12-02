import React from 'react';
import BackButtonPTBR from '../componentes-ptbr/BackButtonPTBR';

class Termos extends React.Component {
    render() {
        return (
            <>
                <BackButtonPTBR />
                <div className="container-terms">
                <h1>Termos de uso</h1>

                <div className="text-terms">
                    <div className="titulo-terms">
                        <h2>Termos</h2>
                        <p>
                            Última atualização: 17/09/2025 <br />
                            <br /> Bem-vindo(a) ao nosso serviço! Ao acessar ou utilizar esta
                            plataforma, você concorda com os presentes Termos de Uso. Por favor,
                            leia atentamente.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>1. Aceitação dos Termos</h3>
                        <p>
                            Ao utilizar este Serviço, você declara que leu, entendeu e concorda
                            em cumprir estes Termos de Uso, bem como a nossa Política de
                            Privacidade. Se você não concordar com estes termos, por favor, não
                            utilize o Serviço.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>2. Uso Permitido</h3>
                        <p>
                            Você concorda em utilizar o Serviço apenas para fins legais e de
                            acordo com as leis vigentes. É proibido:
                        </p>

                        <ul className="lista-terms">
                            <li className="li-terms">
                                <p>• Utilizar o Serviço para fins ilegais ou não autorizados;</p>
                            </li>
                            <li className="li-terms">
                                <p>• Violar direitos de terceiros;</p>
                            </li>
                            <li className="li-terms">
                                <p>
                                    • Interferir no funcionamento do sistema ou tentar acessar áreas
                                    restritas.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="p-terms">
                        <h3>3. Cadastro e Conta</h3>
                        <p>
                            Algumas funcionalidades podem exigir a criação de uma conta. Ao se
                            cadastrar, você se compromete a fornecer informações verdadeiras,
                            completas e atualizadas. Você é responsável por manter a
                            confidencialidade de sua senha e por todas as atividades realizadas
                            em sua conta.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>4. Propriedade Intelectual</h3>
                        <p>
                            Todo o conteúdo disponível no Serviço (textos, imagens, logotipos,
                            marcas, códigos etc.) é protegido por direitos autorais e pertence
                            ao proprietário do Serviço ou a terceiros licenciadores. É proibido
                            copiar, reproduzir ou distribuir qualquer parte do conteúdo sem
                            autorização prévia.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>5. Modificações no Serviço</h3>
                        <p>
                            Reservamo-nos o direito de modificar, suspender ou descontinuar,
                            temporariamente ou permanentemente, qualquer parte do Serviço, com
                            ou sem aviso prévio. Não seremos responsáveis por qualquer
                            modificação, suspensão ou descontinuidade do Serviço.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>6. Isenção de Responsabilidade</h3>
                        <p>
                            O uso do Serviço é por sua conta e risco. Não garantimos que o
                            Serviço estará sempre disponível, livre de erros ou seguro. Em
                            nenhuma circunstância seremos responsáveis por danos diretos,
                            indiretos ou consequentes decorrentes do uso ou da incapacidade de
                            usar o Serviço.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>7. Encerramento</h3>
                        <p>
                            Podemos encerrar ou suspender seu acesso ao Serviço, a nosso
                            critério, a qualquer momento, sem aviso prévio, caso haja violação
                            destes Termos.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>8. Alterações nos Termos</h3>
                        <p>
                            Estes Termos de Uso podem ser atualizados periodicamente.
                            Recomendamos que você os revise com frequência. O uso continuado do
                            Serviço após alterações constitui aceitação das novas condições.
                        </p>
                    </div>
                </div>
                </div>
            </>
        );
    }
}


export default Termos;