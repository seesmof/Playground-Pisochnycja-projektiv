/* 
Визначити код мовою XAML на основі фреймворку WPF для представлення відображення деталізованого опису книги, включаючи зокрема її назву (title), основного автора (author), рік видання (year), кількість сторінок (pages), опис на декілька рядків (description) та можливо додаткові характеристики. Перші 4 характеристики відображаються послідовно в двох стовпчиках: author і year у першому, title і pages - у другому. Опис займає одразу два стовпчика. Виконати прив'язування до відповідних даних з моделі представлення. Для переходу до наступної та попередньої книг визначити кнопки, використовуючи відповідні команди з моделі представлення.
*/

<Page x:Class="seven.TestPage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
      xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
      xmlns:local="clr-namespace:seven"
      mc:Ignorable="d" 
      d:DesignHeight="450" d:DesignWidth="800"
      Title="TestPage">

    <Grid Background="Wheat">
        <Grid.RowDefinitions>
            <RowDefinition Height="43*"/>
            <RowDefinition Height="42*"/>
            <RowDefinition Height="48*"/>
            <RowDefinition Height="317*"/>
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="111*"/>
            <ColumnDefinition Width="127*"/>
            <ColumnDefinition Width="562*"/>
        </Grid.ColumnDefinitions>
        <Label x:Name="Title" Content="Book Title" Margin="10,10,3,0" VerticalAlignment="Top" Height="26"/>
        <Label x:Name="Author" Content="Book Author" Margin="10,10,9,0" VerticalAlignment="Top" Grid.Column="1" Height="26"/>
        <Label x:Name="Year" Content="Book Year" Margin="10,0,3,0" VerticalAlignment="Center" Height="26" Grid.Row="1"/>
        <Label x:Name="Pages" Content="Book Pages" Margin="10,0,9,0" VerticalAlignment="Center" Grid.Column="1" Height="26" Grid.Row="1"/>
        <Label x:Name="Description" Content="Book Description" Margin="10,0,10,0" VerticalAlignment="Center" Height="26" Grid.Row="2" Grid.ColumnSpan="2" />
    </Grid>
</Page>
