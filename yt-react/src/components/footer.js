import React from 'react';
function Footer() {

    const date = new Date();

    return (
        <div>
            <br /><br />
            <hr />
            <footer>
                <div className="text-center">
                    <p>
                        Copyright© {date.getFullYear()} Leonardo Almeida da Silva
                    <br />
                    Todos os direitos reservados.
                </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;