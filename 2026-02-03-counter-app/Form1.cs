using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _2026_02_03_counter_app
{
    public partial class Form1 : Form
    {
        private int count = 0;

        public Form1()
        {
            InitializeComponent();
        }

        private void buttonLess_Click(object sender, EventArgs e)
        {
            count -= 1;
            updateCount();
        }

        private void updateCount()
        {
            labelCount.Text = $"Count: {count}";
        }

        private void buttonMore_Click(object sender, EventArgs e)
        {
            count += 1;
            updateCount();
        }
    }
}
