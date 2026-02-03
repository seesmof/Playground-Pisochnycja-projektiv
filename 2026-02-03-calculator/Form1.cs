using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _2026_02_03_calculator
{
    public partial class Form1 : Form
    {
        private string input;

        public Form1()
        {
            InitializeComponent();
        }

        private void updateInput()
        {
            inputTextBox.Text = input;
        }

        private void buttonSeven_Click(object sender, EventArgs e)
        {
            input += "7";
            updateInput();
        }

        private void buttonEight_Click(object sender, EventArgs e)
        {
            input += "8";
            updateInput();
        }

        private void buttonNine_Click(object sender, EventArgs e)
        {
            input += "9";
            updateInput();
        }

        private void buttonDivide_Click(object sender, EventArgs e)
        {
            input += "/";
            updateInput();
        }

        private void buttonFour_Click(object sender, EventArgs e)
        {
            input += "4";
            updateInput();
        }

        private void buttonFive_Click(object sender, EventArgs e)
        {
            input += "5";
            updateInput();
        }

        private void buttonSix_Click(object sender, EventArgs e)
        {
            input += "6";
            updateInput();
        }

        private void buttonMultiply_Click(object sender, EventArgs e)
        {
            input += "*";
            updateInput();
        }

        private void buttonOne_Click(object sender, EventArgs e)
        {
            input += "1";
            updateInput();
        }

        private void buttonTwo_Click(object sender, EventArgs e)
        {
            input += "2";
            updateInput();
        }

        private void buttonThree_Click(object sender, EventArgs e)
        {
            input += "3";
            updateInput();
        }

        private void buttonMinus_Click(object sender, EventArgs e)
        {
            input += "-";
            updateInput();
        }

        private void buttonZero_Click(object sender, EventArgs e)
        {
            input += "0";
            updateInput();
        }

        private void buttonComma_Click(object sender, EventArgs e)
        {
            input += ",";
            updateInput();
        }

        private void buttonPlus_Click(object sender, EventArgs e)
        {
            input += "+";
            updateInput();
        }

        private void buttonEquals_Click(object sender, EventArgs e)
        {
            string previousData = "";
            int previousNumber = 0;
            for (int i = 0; i < input.Length; i++)
            {
                char currentChar = input[i];
            }
        }
    }
}
