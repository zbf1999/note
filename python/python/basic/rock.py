import random

class NewGame:

    def __init__(self):
        self.score = 0
        self.human = 0
        self.comp = 0
        self.comp_score = 0
        self.rps_dict = {1: 'rock', 2: 'paper', 3: 'scissor'}

    def calc_score(self, human, comp):
        self.human = human
        self.comp = comp
        scor_tupl = (self.human, self.comp)
        if (3 not in scor_tupl) and (1 not in scor_tupl):
            if self.human > self.comp:
                self.score += 1
            elif self.comp > self.human:
                self.comp_score += 1
        elif (3 in scor_tupl) and (2 in scor_tupl):
            if self.human > self.comp:
                self.score += 1
            elif self.comp > self.human:
                self.comp_score += 1
        else:
            if self.human < self.comp:
                self.score += 1
            elif self.comp < self.human:
                self.comp_score += 1

    def chk_endgame(self):
        if max(self.score, self.comp_score) == 2:
            if self.score > self.comp_score:
                return "Player"
            elif self.comp_score > self.score:
                return "Computer"
            else:
                return "No-one"
        else:
            return None


if __name__ == '__main__':
    game = NewGame()
    while True:
        try:
            print("Enter 1 for rock, 2 for paper, 3 for scissor: ")
            sel_player = int(input())
            if sel_player in game.rps_dict:
                sel_comp = random.choice((1, 2, 3))
                print("You: " + game.rps_dict[sel_player])
                print("Computer: " + game.rps_dict[sel_comp])
                game.calc_score(sel_player, sel_comp)
                if game.chk_endgame() is not None:
                    print("{} wins the game".format(game.chk_endgame()))
                    break
            else:
                break
        except:
            print('Error!')