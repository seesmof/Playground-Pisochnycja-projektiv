using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace client
{
    public partial class SignUp : Form
    {
        public SignUp()
        {
            InitializeComponent();
        }

        private void loginLinkButtonClick(object sender, EventArgs e)
        {
            var loginForm = new LogIn();
            this.Hide();
            loginForm.Show();
        }
    }
}
