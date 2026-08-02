namespace client
{
    partial class SignUp
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            loginLinkButton = new Button();
            button2 = new Button();
            label1 = new Label();
            textBox1 = new TextBox();
            label2 = new Label();
            textBox2 = new TextBox();
            label3 = new Label();
            textBox3 = new TextBox();
            SuspendLayout();
            // 
            // loginLinkButton
            // 
            loginLinkButton.Location = new Point(12, 258);
            loginLinkButton.Name = "loginLinkButton";
            loginLinkButton.Size = new Size(319, 34);
            loginLinkButton.TabIndex = 0;
            loginLinkButton.Text = "Вже маєте акаунт?";
            loginLinkButton.UseVisualStyleBackColor = true;
            loginLinkButton.Click += loginLinkButtonClick;
            // 
            // button2
            // 
            button2.Location = new Point(12, 218);
            button2.Name = "button2";
            button2.Size = new Size(319, 34);
            button2.TabIndex = 1;
            button2.Text = "Зареєструватися";
            button2.UseVisualStyleBackColor = true;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(12, 9);
            label1.Name = "label1";
            label1.Size = new Size(56, 25);
            label1.TabIndex = 2;
            label1.Text = "Логін";
            // 
            // textBox1
            // 
            textBox1.Location = new Point(12, 37);
            textBox1.Name = "textBox1";
            textBox1.Size = new Size(319, 31);
            textBox1.TabIndex = 3;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(12, 82);
            label2.Name = "label2";
            label2.Size = new Size(74, 25);
            label2.TabIndex = 4;
            label2.Text = "Пароль";
            // 
            // textBox2
            // 
            textBox2.Location = new Point(12, 110);
            textBox2.Name = "textBox2";
            textBox2.Size = new Size(319, 31);
            textBox2.TabIndex = 5;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(12, 153);
            label3.Name = "label3";
            label3.Size = new Size(159, 25);
            label3.TabIndex = 6;
            label3.Text = "Повторіть пароль";
            // 
            // textBox3
            // 
            textBox3.Location = new Point(12, 181);
            textBox3.Name = "textBox3";
            textBox3.Size = new Size(319, 31);
            textBox3.TabIndex = 7;
            // 
            // SignUp
            // 
            AutoScaleDimensions = new SizeF(10F, 25F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(343, 312);
            Controls.Add(textBox3);
            Controls.Add(label3);
            Controls.Add(textBox2);
            Controls.Add(label2);
            Controls.Add(textBox1);
            Controls.Add(label1);
            Controls.Add(button2);
            Controls.Add(loginLinkButton);
            Name = "SignUp";
            Text = "Зареєструватися";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button loginLinkButton;
        private Button button2;
        private Label label1;
        private TextBox textBox1;
        private Label label2;
        private TextBox textBox2;
        private Label label3;
        private TextBox textBox3;
    }
}