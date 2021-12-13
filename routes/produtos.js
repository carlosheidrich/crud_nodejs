const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) };

        conn.query(
            'select * from server.produtos',
            (error, resultado, field) => {

                if (error) { return res.status(500).send({ error: error }) };

                return res.status(200).send({ produtos: resultado });
            });
    });
});

router.get('/:cod_produto', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) };

        conn.query(
            'select * from server.produtos WHERE cod_produto = ?;',
            [req.params.cod_produto],
            (error, resultado, field) => {

                if (error) { return res.status(500).send({ error: error }) };

                return res.status(200).send({ produtos: resultado });
            });
    });
});

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query('INSERT INTO produtos (cod_produto, descricao, preco) values (?, ?, ?)',
            [req.body.cod_produto, req.body.descricao, req.body.preco],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(200).send({
                    mensagem: 'Produto salvo no banco.',
                    id_produto: resultado.insertId
                });
            });
    });
});

router.patch('/:id_produto', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(`UPDATE produtos 
                       SET cod_produto = ?, 
                           descricao = ?,
                           preco = ?
                     WHERE id_produto = ?`,
            [req.body.cod_produto,
            req.body.descricao,
            req.body.preco,
            req.params.id_produto],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(200).send({
                    mensagem: 'Produto alterado com sucesso.'
                });
            }
        );
    });
});

router.delete('/:id_produto', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(`DELETE FROM produtos                        
                     WHERE id_produto = ?`,
            [req.params.id_produto],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                res.status(200).send({
                    mensagem: 'Produto excluído com sucesso.'
                });
            });
    });
});

module.exports = router;