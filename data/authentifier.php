<?php

try{

    $pdo = new PDO("mysql:host=127.0.0.1;dbname=epokabddreal;charset=utf8","root","");

    $num = $_GET['num'];

    $mdp = $_GET['motdepasse'];

 

    $req = "SELECT employe_Prenom, employe_Nom, employe_Id FROM employe WHERE employe_Id=:num AND employe_Mdp= :motdepasse";

    $stmt = $pdo->prepare($req);

    $stmt->bindParam(':num', $num);

    $stmt->bindParam(':motdepasse', $mdp);

    $stmt->execute();

    if ($unEmploye = $stmt->fetch()) {

        $prenom = $unEmploye['employe_Prenom'];

        $nom = $unEmploye['employe_Nom'];

        $id = $unEmploye['employe_Id'];

        echo("Bonjour $prenom $nom ");

    } else echo("Mauvaise Identification !");

}catch(Exception $e){

    die ("Gros souci : " . $e->getMessage());

}

?>