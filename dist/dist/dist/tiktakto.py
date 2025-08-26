# tic_tac_toe.py
import tkinter as tk
from tkinter import messagebox

class TicTacToe:
    def __init__(self, root):
        self.root = root
        root.title("Tic-Tac-Toe")
        root.resizable(False, False)

        self.current_player = "X"
        # board represented as list of 9 entries: "", "X", or "O"
        self.board = [""] * 9

        # scores
        self.scores = {"X": 0, "O": 0, "Draws": 0}

        # create UI
        self.create_widgets()
        self.update_status()

    def create_widgets(self):
        top_frame = tk.Frame(self.root, padx=10, pady=10)
        top_frame.pack()

        # scoreboard label
        self.score_label = tk.Label(top_frame, text="", font=("Helvetica", 12))
        self.score_label.grid(row=0, column=0, columnspan=3, pady=(0, 8))

        # status label
        self.status_label = tk.Label(top_frame, text="", font=("Helvetica", 12))
        self.status_label.grid(row=1, column=0, columnspan=3, pady=(0, 8))

        # board frame
        board_frame = tk.Frame(self.root, padx=10, pady=10)
        board_frame.pack()

        self.buttons = []
        for r in range(3):
            for c in range(3):
                idx = r * 3 + c
                btn = tk.Button(
                    board_frame,
                    text="",
                    font=("Helvetica", 32, "bold"),
                    width=4,
                    height=2,
                    command=lambda i=idx: self.on_cell_clicked(i)
                )
                btn.grid(row=r, column=c, padx=5, pady=5)
                self.buttons.append(btn)

        # control frame
        control_frame = tk.Frame(self.root, pady=8)
        control_frame.pack()

        self.reset_button = tk.Button(control_frame, text="Restart Round", command=self.reset_board)
        self.reset_button.grid(row=0, column=0, padx=5)

        self.reset_scores_button = tk.Button(control_frame, text="Reset Scores", command=self.reset_scores)
        self.reset_scores_button.grid(row=0, column=1, padx=5)

        self.quit_button = tk.Button(control_frame, text="Quit", command=self.root.quit)
        self.quit_button.grid(row=0, column=2, padx=5)

    def on_cell_clicked(self, index):
        if self.board[index] != "":
            return  # already taken
        self.board[index] = self.current_player
        self.buttons[index].config(text=self.current_player, state="disabled")
        winner = self.check_winner()

        if winner:
            if winner == "Draw":
                self.scores["Draws"] += 1
                messagebox.showinfo("Tic-Tac-Toe", "It's a draw!")
            else:
                self.scores[winner] += 1
                messagebox.showinfo("Tic-Tac-Toe", f"Player {winner} wins!")
            self.update_status()
            self.disable_all_buttons()
        else:
            self.toggle_player()
            self.update_status()

    def toggle_player(self):
        self.current_player = "O" if self.current_player == "X" else "X"

    def check_winner(self):
        b = self.board
        wins = [
            (0,1,2), (3,4,5), (6,7,8),  # rows
            (0,3,6), (1,4,7), (2,5,8),  # cols
            (0,4,8), (2,4,6)            # diagonals
        ]
        for a, bidx, c in wins:
            if self.board[a] != "" and self.board[a] == self.board[bidx] == self.board[c]:
                return self.board[a]  # "X" or "O"
        # draw?
        if all(cell != "" for cell in self.board):
            return "Draw"
        return None

    def update_status(self):
        self.score_label.config(text=f"Score — X: {self.scores['X']}    O: {self.scores['O']}    Draws: {self.scores['Draws']}")
        self.status_label.config(text=f"Turn: {self.current_player}")

    def disable_all_buttons(self):
        for btn in self.buttons:
            btn.config(state="disabled")

    def reset_board(self):
        self.board = [""] * 9
        self.current_player = "X"
        for btn in self.buttons:
            btn.config(text="", state="normal")
        self.update_status()

    def reset_scores(self):
        if messagebox.askyesno("Reset Scores", "Are you sure you want to reset scores?"):
            self.scores = {"X": 0, "O": 0, "Draws": 0}
            self.reset_board()

if __name__ == "__main__":
    root = tk.Tk()
    app = TicTacToe(root)
    root.mainloop()
