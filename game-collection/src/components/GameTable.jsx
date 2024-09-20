// Importações necessárias do React e do Material-UI
import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Estilos CSS para elementos específicos do componente
const tableStyle = {
  minWidth: 650,
  margin: "auto",
  marginTop: "20px"
};

const headerCellStyle = {
  backgroundColor: "#f5f5f5",
  fontWeight: "bold"
};

// Componente GameTable
function GameTable({ games, handleDeleteGame, setShowForm }) {
  // Estados locais para controlar a abertura e o fechamento do diálogo de confirmação
  const [openDialog, setOpenDialog] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);

  // Função para confirmar a exclusão de um café
  const handleConfirmDelete = () => {
    if (gameToDelete) {
      handleDeleteGame(gameToDelete.id);
      setGameToDelete(null);
    }
    setOpenDialog(false); // Fecha o diálogo de confirmação
  };

  // Função para abrir o diálogo de confirmação antes de excluir um café
  const handleOpenDialog = (game) => {
    setGameToDelete(game);
    setOpenDialog(true);
  };

  return (
    <div>
      {/* Cabeçalho da tabela */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Lista de cafés</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setShowForm(true)}
        >
          Adicionar café
        </Button>
      </Box>

      {/* Tabela de cafés */}
      <TableContainer component={Paper} style={tableStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle} align="center">
                Tipo de grão
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Torra
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Forte
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Ação
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.length === 0 ? ( // Verifica se a lista de cafés está vazia
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="subtitle1">
                    Não há cafés disponíveis.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              // Mapeia e exibe os cafés na tabela
              games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell align="center">{game.grao}</TableCell>
                  <TableCell align="center">{game.torr}</TableCell>
                  <TableCell align="center">{game.strong}</TableCell>
                  <TableCell align="center">
                    {/* Botão para excluir um café */}
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenDialog(game)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmação para excluir um café */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir o café "{gameToDelete?.grao}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GameTable; // Exportação do componente GameTable
