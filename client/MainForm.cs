namespace client
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }

        private void loginButtonClick(object sender, EventArgs e)
        {
            var loginForm = new LogIn();
            this.Hide();
            loginForm.Show();
        }
    }
}
