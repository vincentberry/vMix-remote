<div id="VmixScript" style="display: none;">
        Dim userurl As String = "<p id="urlserverscriptmvix"></p>api/api.php"
        Dim mac As String = "1"
        Dim random As New Random()
        dim useraccountcode AS String = random.Next(1, 999999999).ToString()
        Console.WriteLine("la session vmix est n°")
        Console.WriteLine(useraccountcode)
        ' ---------------------------------------------------
        Dim ScriptLength As String = "FFA5"
        Dim dummy As String = "none"
        Dim u As String = "xml"
        Dim p As String = "pvmix"
        Do While True
        Dim stateon As String = "NOTCONNECTED"
        Dim state As String = "CONNECTED"
        Dim xml As String = API.XML()
        Dim W As New Net.WebClient
        Dim NC As New System.Collections.Specialized.NameValueCollection
        NC.Add("xml",xml)
        Dim R As String
        Dim con As String = userurl
        NC.Add("connector",useraccountcode)
        NC.Add("STATE",state)
        Dim RESP As Byte()
        Dim conected As String = userurl & p & u
        Try
        RESP = W.UploadValues(con, NC)
        R = System.Text.Encoding.ASCII.GetString(RESP)
        Dim rawCommand As string = R
        ' Afficher la réponse

        ' Diviser la chaîne en un tableau en utilisant |serpare| comme délimiteur
        Dim commands As String() = rawCommand.Split("!"c)
        Dim command
        ' Parcourir chaque commande dans le tableau
        For Each command In commands
        Dim commandParts As String() = command.Split(","c)
        If commandParts.Length = 4 Then
        Dim functionType As String = commandParts(0).Trim()
        Dim inputParam As String = commandParts(1).Trim()
        Dim valueParam As String = commandParts(2).Trim()
        Dim durationParam As String = commandParts(3).Trim()

        ' Appeler la fonction VMix avec les paramètres appropriés
        API.Function(functionType, Input:=inputParam, Value:=valueParam, Duration:=durationParam)
        'Console.WriteLine(functionType)
        Elseif Not String.IsNullOrEmpty(rawCommand) Then
        'Console.WriteLine(rawCommand)
        Else
        'Console.WriteLine("La commande VMix est mal formée.")
        End If
        Next


        catch
        End Try
        Dim StringValue As String = conected & userurl & R
        sleep(1000)
        Loop

</div>