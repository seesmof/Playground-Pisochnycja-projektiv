namespace _2026_02_03_counter_app
{
    partial class Form1
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
            this.buttonLess = new System.Windows.Forms.Button();
            this.labelCount = new System.Windows.Forms.Label();
            this.buttonMore = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // buttonLess
            // 
            this.buttonLess.Location = new System.Drawing.Point(12, 12);
            this.buttonLess.Name = "buttonLess";
            this.buttonLess.Size = new System.Drawing.Size(126, 55);
            this.buttonLess.TabIndex = 0;
            this.buttonLess.Text = "Less";
            this.buttonLess.UseVisualStyleBackColor = true;
            this.buttonLess.Click += new System.EventHandler(this.buttonLess_Click);
            // 
            // labelCount
            // 
            this.labelCount.AutoSize = true;
            this.labelCount.Location = new System.Drawing.Point(144, 29);
            this.labelCount.Name = "labelCount";
            this.labelCount.Size = new System.Drawing.Size(69, 20);
            this.labelCount.TabIndex = 1;
            this.labelCount.Text = "Count: 0";
            // 
            // buttonMore
            // 
            this.buttonMore.Location = new System.Drawing.Point(229, 12);
            this.buttonMore.Name = "buttonMore";
            this.buttonMore.Size = new System.Drawing.Size(126, 53);
            this.buttonMore.TabIndex = 2;
            this.buttonMore.Text = "More";
            this.buttonMore.UseVisualStyleBackColor = true;
            this.buttonMore.Click += new System.EventHandler(this.buttonMore_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(377, 89);
            this.Controls.Add(this.buttonMore);
            this.Controls.Add(this.labelCount);
            this.Controls.Add(this.buttonLess);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button buttonLess;
        private System.Windows.Forms.Label labelCount;
        private System.Windows.Forms.Button buttonMore;
    }
}

